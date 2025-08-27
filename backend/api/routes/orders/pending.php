<?php
/**
 * @openapi
 * /orders/pending.php:
 *   get:
 *     summary: Get all pending orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of pending orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
require_once '../../initialize.php';

$pendingOrders = orders::findPendingOrders();
echo json_encode([
    'status' => 'success',
    'orders' => $pendingOrders
]);
exit;
