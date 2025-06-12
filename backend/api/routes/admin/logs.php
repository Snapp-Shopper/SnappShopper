<?php
/**
 * @openapi
 * /admin/logs.php:
 *   get:
 *     summary: View or download the latest developer logs
 *     description: Allows an authorized admin to view the last 200 lines of dev logs, download the full log file, or clear the log file.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [view, download, clear]
 *         required: false
 *         description: Action to perform on the logs (default is "view")
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin API token for authorization
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: false
 *         description: Alternative way to provide the admin API token via query param (not recommended)
 *     responses:
 *       200:
 *         description: Result of the requested log action
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     lines:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The last 200 lines of the log file (for "view" action)
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     message:
 *                       type: string
 *                       example: Log file cleared.
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: error
 *                     message:
 *                       type: string
 *                       example: Log file not found.
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Raw log file contents (for "download" action)
 *       401:
 *         description: Unauthorized - invalid or missing token
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
 *                   example: Unauthorized
 *       400:
 *         description: Invalid action requested
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
 *                   example: Invalid action
 */

// Description: Admin endpoint for viewing, downloading, or clearing dev logs
require_once '../../initialize.php';

header('Content-Type: application/json');

// === AUTH CHECK ===
$headers = getallheaders();
$providedToken = $headers['Authorization'] ?? ($_GET['token'] ?? '');
if ($providedToken !== ADMIN_API_TOKEN) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// === LOG CONFIG ===
$logFile = __DIR__ . '/../../logs/dev.log';
if (!file_exists($logFile)) {
    // Create the log file if it doesn't exist
    file_put_contents($logFile, '');
}

// === ROUTING ===
$action = $_GET['action'] ?? 'view';

switch ($action) {
    case 'view':
        if (!file_exists($logFile)) {
            echo json_encode(['status' => 'success', 'message' => 'No logs found.', 'log' => '']);
            exit;
        }

        $lines = file($logFile);
        $lastLines = array_slice($lines, -200); // limit to last 200 lines
        echo json_encode([
            'status' => 'success',
            'lines' => array_map('trim', $lastLines)
        ]);
        break;

    case 'download':
        if (!file_exists($logFile)) {
            echo json_encode(['status' => 'error', 'message' => 'Log file not found.']);
            exit;
        }

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="dev.log"');
        readfile($logFile);
        exit;

    case 'clear':
        if (file_exists($logFile)) {
            unlink($logFile);
        }

        echo json_encode(['status' => 'success', 'message' => 'Log file cleared.']);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}
