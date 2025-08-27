<?php
/**
 * @openapi
 * /auditlogs.php:
 *   get:
 *     summary: Retrieve audit logs
 *     description: Fetch audit logs either by log ID, user ID, or all logs for admin.
 *     tags:
 *       - Audit Logs
 *     parameters:
 *       - in: query
 *         name: log_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Retrieve a specific log by ID
 *       - in: query
 *         name: user_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Retrieve logs for a specific user
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     logs:
 *                       type: array
 *                       items:
 *                         type: object
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     log:
 *                       type: object
 *       404:
 *         description: Log not found
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
 *                   example: Log not found
 */

require_once '../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$log_id  = $_GET['log_id'] ?? null;
$user_id = $_GET['user_id'] ?? null;

if ($log_id) {
    $log = auditLog::findLogById($log_id);
    if ($log) {
        echo json_encode([
            'status' => 'success',
            'log' => $log
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Log not found'
        ]);
    }
} elseif ($user_id) {
    $logs = auditLog::findLogsByUserId($user_id);
    echo json_encode([
        'status' => 'success',
        'logs' => $logs
    ]);
} else {
    $logs = auditLog::findAllLogs();
    echo json_encode([
        'status' => 'success',
        'logs' => $logs
    ]);
}
exit;
