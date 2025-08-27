<?php
/**
 * @openapi
 * /notifications/register-device.php:
 *   post:
 *     summary: Register device token for push notifications
 *     description: Stores the device token (from Firebase or other push provider) for a specific user to enable sending push notifications.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - device_token
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 101
 *               device_token:
 *                 type: string
 *                 example: fcm_token_abc123xyz
 *     responses:
 *       200:
 *         description: Device token registered successfully
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
 *                   example: Device registered
 *       400:
 *         description: Missing user_id or device_token
 */

require_once '../../initialize.php';

$data = $_POST;
if (empty($data)) {
    $rawInput = file_get_contents('php://input');
    // Try to decode JSON
    $decoded = json_decode($rawInput, true);
    
    if (json_last_error() === JSON_ERROR_NONE) {
        $data = $decoded;
    } else {
        // Try to auto-fix bad JSON (unquoted keys)
       $data = fixBrokenJson($rawData);
    }
}
$user_id = $data['user_id'] ?? null;
$device_token = $data['device_token'] ?? '';

if (!$user_id || !$device_token) {
    echo json_encode(['status' => 'error', 'message' => 'Missing user_id or device_token']);
    exit;
}

// Save token in DB
DeviceToken::saveOrUpdate($user_id, $device_token);

echo json_encode(['status' => 'success', 'message' => 'Device registered']);
