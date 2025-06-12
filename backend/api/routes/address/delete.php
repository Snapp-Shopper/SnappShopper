<?php
/**
 * @openapi
 * /address/delete.php:
 *   post:
 *     summary: Delete an address by ID
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
 *                 description: ID of the address to delete
 *             required:
 *               - address_id
 *     responses:
 *       200:
 *         description: Address deleted successfully
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
 *                   example: Address deleted successfully.
 *       400:
 *         description: Invalid input or address not found
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
 *                   example: address_id is required
 */

// Description: This endpoint handles the deletion of an address by its ID.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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

    if (empty($data['address_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'address_id is required']);
        exit;
    }

    $address = address::findAddressById($data['address_id']);
    if (!$address) {
        echo json_encode(['status' => 'error', 'message' => 'Address not found']);
        exit;
    }

    $response = $address->addressDelete();
    echo json_encode($response);
    exit;
}
