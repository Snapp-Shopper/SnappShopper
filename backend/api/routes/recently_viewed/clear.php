<?php
/**
 * @openapi
 * /recently_viewed/clear.php:
 *   delete:
 *     summary: Clear all recently viewed items for a user
 *     tags:
 *       - RecentlyViewed
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose recently viewed list should be cleared
 *     responses:
 *       200:
 *         description: Recently viewed items cleared
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
 *                   example: Recently viewed items cleared successfully
 *       400:
 *         description: Missing user ID
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
 *                   example: User ID is required
 */

require_once '../../initialize.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User ID is required'
    ]);
    exit;
}

$cleared = recentlyViewedItem::clearByUserId($user_id);
echo json_encode($response);
exit;
