<?php
/**
 * @openapi
 * /address/save_address.php:
 *   post:
 *     summary: Save a new address for a user, optionally set as default
 *     tags:
 *       - Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user owning the address
 *               address_line1:
 *                 type: string
 *                 description: Primary address line
 *               address_line2:
 *                 type: string
 *                 description: Secondary address line (optional)
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *               is_default:
 *                 type: boolean
 *                 description: Set this address as the default for the user
 *             required:
 *               - user_id
 *               - address_line1
 *               - city
 *               - state
 *               - zip_code
 *               - country
 *     responses:
 *       200:
 *         description: Address saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Address saved successfully.
 *       400:
 *         description: Invalid or missing input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No valid data received.
 *       405:
 *         description: Invalid request method
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid request method.
 */

// Description: This endpoint saves addresses for a user, and can set to default address if provided.
require_once '../../initialize.php'; // Include the initialization file

require_once '../../src/header.php'; // Include the header model

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Try to get form-data first
    $data = $_POST;

    // If $_POST is empty, try to decode raw JSON input
    if (empty($data)) {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true); // true = return associative arrayging line to check the raw data
    }

    if (empty($data)) {
        // Still empty? Then it's invalid input
        echo json_encode([
            'status' => 'error',
            'message' => 'No valid data received.'
        ]);
        exit;
    }

    // Proceed with creation of address
        
    // Create Address instance from POST data
    $address = new address([
        'user_id'        => $data['user_id'] ?? null,
        'address_line1'  => $data['address_line1'] ?? '',
        'address_line2'  => $data['address_line2'] ?? '',
        'city'           => $data['city'] ?? '',
        'state'          => $data['state'] ?? '',
        'zip_code'       => $data['zip_code'] ?? '',
        'country'        => $data['country'] ?? '',
        'is_default'     => $data['is_default'] ?? false,
        'created_at'     => date('Y-m-d H:i:s')
    ]);

    // Save address
    $response = $address->saveAddress();

    // If address is to be set as default
    if ($response['status'] === 'success' && $address->is_default) {
        $address->setDefaultAddress(); // Will automatically update others to non-default
    }

    // Return response
    echo json_encode($response);
    exit;
}
else {
    // If not a POST request, reject it
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}