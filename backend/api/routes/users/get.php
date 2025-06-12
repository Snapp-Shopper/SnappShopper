<?php
/**
 * @openapi
 * /users/get.php:
 *   get:
 *     summary: Retrieve users
 *     description: |
 *       Fetch user data. 
 *       If `user_id` is provided as a query parameter, returns the user with that ID.
 *       Otherwise, returns all users.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successful operation
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
 *                       type: object
 *                       description: User object or list of users
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: No data found
 *       405:
 *         description: Method Not Allowed
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
 *                   example: Method Not Allowed
 */

require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$userId = $_GET['user_id'] ?? null;

if ($userId) {
    $users = users::findUserById($userId);
} else {
    $users = users::findAll();
}

if ($users) {
    echo json_encode(['success' => true, 'data' => $users]);
} else {
    echo json_encode(['success' => false, 'message' => 'No data found']);
}
