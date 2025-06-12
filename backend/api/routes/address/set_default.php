<?php
/**
 * @openapi
 * /address/set_default.php:
 *   post:
 *     summary: Set an address as the default address by its ID
 *     tags:
 *       - Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_id:
 *                 type: integer
 *                 description: ID of the address to set as default
 *             required:
 *               - address_id
 *     responses:
 *       200:
 *         description: Address set as default successfully
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
 *                   example: Address set as default
 *       400:
 *         description: Missing or invalid address_id
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
 *                   example: address_id is required.
 *       404:
 *         description: Address not found
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
 *                   example: Address not found
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

// Description: This endpoint sets the default address based on the address ID provided.
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

    // Check if address_id is provided
    if (empty($data['address_id'])) {
        echo json_encode([
            'status' => 'error',
            'message' => 'address_id is required.'
        ]);
        exit;
    }
    // Proceed with setting default address
        
    // Find address by ID
    $address = address::findAddressById($data['address_id']);
    // Check if address exists
    if (!$address) {
        echo json_encode(['status' => 'error', 'message' => 'Address not found']);
        exit;
    }
    
    // Set it as default
    $address->setDefaultAddress();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Address set as default'
    ]);
}
else {
    // If not a POST request, reject it
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}