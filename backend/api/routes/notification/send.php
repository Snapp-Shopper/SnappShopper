<?php
/**
 * @openapi
 * /notifications/send.php:
 *   post:
 *     summary: Send a custom notification to user(s)
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user to send the notification to (optional if multiple_users is set)
 *               multiple_users:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of user IDs to notify
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification(s) sent successfully
 */

require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Parse input (JSON or form-data)
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
if (empty($data)) {
    echo json_encode(['status' => 'error', 'message' => 'No data provided']);
    exit;
}
$message = trim($data['message'] ?? '');
$user_id = $data['user_id'] ?? null;
$multiple_users = $data['multiple_users'] ?? [];

if (empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Message is required']);
    exit;
}

// Determine recipients
$recipients = [];

if (!empty($multiple_users) && is_array($multiple_users)) {
    $recipients = array_map('intval', $multiple_users);
} elseif (!empty($user_id)) {
    $recipients[] = (int)$user_id;
} else {
    echo json_encode(['status' => 'error', 'message' => 'user_id or multiple_users is required']);
    exit;
}

// Send notifications
$results = [];
foreach ($recipients as $uid) {
    $notify = notification::notify($uid, $message);
    $results[] = $notify;
}

echo json_encode([
    'status' => 'success',
    'message' => 'Notification(s) sent successfully',
    'results' => $results
]);
