<?php
/**
 * @openapi
 * /address/get.php:
 *   get:
 *     summary: Retrieve addresses for a user
 *     tags:
 *       - Address
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to retrieve addresses for
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [getDefault]
 *         required: false
 *         description: Use 'getDefault' to retrieve the default address only
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Address object
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: No data found
 *       400:
 *         description: Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: user_id parameter is required
 */

// Description: This endpoint retrieves addresses for a user, either all addresses or the default address based on the user ID provided.
require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($_GET['action'] == 'getDefault' && $_GET['user_id']) {
        # code...
        $address = address::findDefaultAddressByUserId($_GET['user_id']);    
        
        if ($address) {
            echo json_encode(['success' => true, 'data' => $address]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    else if ($_GET['user_id']) {
        # code...
        $address = address::findAddressesByUserId($_GET['user_id']);

        if ($address) {
            echo json_encode(['success' => true, 'data' => $address]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    
}
?>
