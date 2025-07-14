<?php

class ShipperEstimator
{
    private static $delivery_windows = [
        'local' => [1, 2],
        'regional' => [3, 5],
        'international' => [7, 14]
    ];

    private static $use_dhl_api = true; // Toggle DHL live usage
    private static $dhl_api_key = DHL_API_KEY; // Replace with your DHL API Key

    public static function estimateDeliveryWindow($order_items, $shipping_address)
    {
        $max_days = 0;

        foreach ($order_items as $item) {
            $product = products::findById($item['product_id']);
            $productVendor = productVendor::findByProductId($product->product_id);
            $vendor = Vendor::findVendorById($productVendor->vendor_id);

            $from_postal = $vendor->zip_code ?? '100001';
            $from_city = $vendor->city ?? 'Lagos';
            $from_country = $vendor->country ?? 'NG';

            $to_postal = $shipping_address->zip_code ?? '100001';
            $to_city = $shipping_address->city;
            $to_country = $shipping_address->country;

            if (self::$use_dhl_api) {
                $dhl_days = self::getDhlEstimate([
                    'postalCode' => $from_postal,
                    'cityName' => $from_city,
                    'countryCode' => $from_country
                ], [
                    'postalCode' => $to_postal,
                    'cityName' => $to_city,
                    'countryCode' => $to_country
                ]);

                if ($dhl_days['status'] === 'success') {
                    $days = (int)$dhl_days['days'];
                    if ($days > $max_days) $max_days = $days;
                } else {
                    return $dhl_days; // return error message
                }
            } else {
                $days = self::fallbackEstimate($from_country, $from_city, $to_country, $to_city);
                if ($days > $max_days) $max_days = $days;
            }
        }

        $start = new DateTime();
        $end = new DateTime();
        $end->modify("+{$max_days} days");

        return [
            'status' => 'success',
            'start' => $start->format('Y-m-d'),
            'end' => $end->format('Y-m-d'),
            'estimated_range' => "{$start->format('Y-m-d')} to {$end->format('Y-m-d')}",
            'delivery_days' => $max_days
        ];
    }

    private static function getDhlEstimate($origin, $destination)
    {
        $url = 'https://express.api.dhl.com/mydhlapi/rates';

        $payload = [
            "customerDetails" => [
                "shipperDetails" => $origin,
                "receiverDetails" => $destination
            ],
            "plannedShippingDateAndTime" => date(DATE_ATOM),
            "unitOfMeasurement" => "metric",
            "isCustomsDeclarable" => true,
            "packages" => [
                [
                    "weight" => 1,
                    "dimensions" => [
                        "length" => 10,
                        "width" => 10,
                        "height" => 10
                    ]
                ]
            ]
        ];

        $headers = [
            "Content-Type: application/json",
            "DHL-API-Key: " . self::$dhl_api_key
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => json_encode($payload),
        ]);

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code === 200 && $response) {
            $data = json_decode($response, true);
            if (!empty($data['products'][0]['deliveryTime'])) {
                return [
                    'status' => 'success',
                    'days' => $data['products'][0]['deliveryTime'],
                    'service' => $data['products'][0]['productName'] ?? 'DHL Express'
                ];
            }
        }

        return [
            'status' => 'error',
            'message' => 'Failed to fetch from DHL API',
            'code' => $http_code,
            'response' => $response
        ];
    }

    private static function fallbackEstimate($from_country, $from_region, $to_country, $to_region)
    {
        if ($from_country !== $to_country) {
            $range = self::$delivery_windows['international'];
        } elseif ($from_region !== $to_region) {
            $range = self::$delivery_windows['regional'];
        } else {
            $range = self::$delivery_windows['local'];
        }

        return $range[1]; // max range
    }
}
