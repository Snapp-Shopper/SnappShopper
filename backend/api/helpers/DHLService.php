<?php

class DHLService
{
    private static $client_id = DHL_CLIENT_ID;
    private static $client_secret = DHL_CLIENT_SECRET;
    private static $base_url = 'https://api-mydhl.dhl.com';

    /**
     * Creates a live shipment via DHL API.
     */
    public static function createShipment($data)
    {
        $access_token = self::getAccessToken();

        if (!$access_token) {
            return ['status' => 'error', 'message' => 'Failed to authenticate with DHL'];
        }

        // Build the DHL-compliant payload
        $payload = self::buildShipmentPayload($data);

        $url = self::$base_url . '/shipments';
        $headers = [
            "Authorization: Bearer $access_token",
            "Content-Type: application/json",
            "DHL-API-Key: " . self::$client_id
        ];

        $response = self::post($url, $headers, $payload);

        if (!empty($response['shipmentTrackingNumber'])) {
            return [
                'status' => 'success',
                'tracking_number' => $response['shipmentTrackingNumber'],
                'start' => date('Y-m-d'), // or use ETA from DHL if available
                'end' => date('Y-m-d', strtotime('+3 days')) // estimated range
            ];
        }

        return [
            'status' => 'error',
            'message' => $response['detail'] ?? 'DHL Shipment failed',
            'dhl_response' => $response
        ];
    }

    /**
     * Authenticate with DHL API using client credentials flow.
     */
    private static function getAccessToken()
    {
        $token_url = 'https://api.dhl.com/oauth/token';
        $auth = base64_encode(self::$client_id . ':' . self::$client_secret);

        $headers = [
            "Authorization: Basic $auth",
            "Content-Type: application/x-www-form-urlencoded"
        ];

        $post_fields = http_build_query([
            'grant_type' => 'client_credentials'
        ]);

        $ch = curl_init($token_url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS => $post_fields,
            CURLOPT_HTTPHEADER => $headers
        ]);

        $result = curl_exec($ch);
        curl_close($ch);

        $json = json_decode($result, true);
        return $json['access_token'] ?? null;
    }

    /**
     * Prepare DHL shipment JSON structure.
     */
    private static function buildShipmentPayload($data)
    {
        $shipper = $data['vendor'];
        $recipient = $data['address'];

        return [
            "plannedShippingDateAndTime" => date('c'), // ISO8601 timestamp
            "pickup" => [
                "isRequested" => false
            ],
            "productCode" => "P", // Express Worldwide
            "customerDetails" => [
                "shipperDetails" => [
                    "postalAddress" => [
                        "cityName" => $shipper['city'],
                        "countryCode" => $shipper['country'],
                        "postalCode" => $shipper['zip_code'],
                        "streetLines" => [$shipper['address']]
                    ],
                    "contactInformation" => [
                        "email" => $shipper['email'],
                        "phone" => $shipper['phone']
                    ]
                ],
                "receiverDetails" => [
                    "postalAddress" => [
                        "cityName" => $recipient->city,
                        "countryCode" => $recipient->country,
                        "postalCode" => $recipient->zip_code,
                        "streetLines" => [$recipient->address_line1]
                    ],
                    "contactInformation" => [
                        "email" => $recipient->email ?? "noreply@example.com",
                        "phone" => $recipient->phone ?? "0000000000"
                    ]
                ]
            ],
            "content" => [
                "packages" => [
                    [
                        "weight" => 1.5,
                        "dimensions" => [
                            "length" => 10,
                            "width" => 10,
                            "height" => 10
                        ]
                    ]
                ]
            ]
        ];
    }

    /**
     * Send a POST request using CURL.
     */
    private static function post($url, $headers, $payload)
    {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_HTTPHEADER => $headers
        ]);

        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            return ['error' => $error];
        }

        return json_decode($response, true);
    }
}
