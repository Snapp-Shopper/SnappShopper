<?php
/**
 * @openapi
 * /notifications/index.php:
 *   get:
 *     summary: Get user notifications
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         default: 20
 *     responses:
 *       200:
 *         description: List of user notifications
 */

require_once '../../initialize.php';

$user_id = $_GET['user_id'] ?? null;
$limit   = $_GET['limit'] ?? 20;

if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'User ID is required']);
    exit;
}

$notifications = notification::findNotificationsByUserId($user_id, (int)$limit);
$unseen_count  = notification::countUnseen($user_id);

echo json_encode([
    'status' => 'success',
    'notifications' => $notifications,
    'unseen_count' => $unseen_count
]);
