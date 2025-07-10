<?php
/**
 * @openapi
 * /orders/by_daterange.php:
 *   get:
 *     summary: Get orders within a date range
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: start
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - name: end
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Orders in the specified range
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
 *       400:
 *         description: Missing or invalid date range
 *       500:
 *         description: Server error
 */
require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$start = $_GET['start'] ?? null;
$end   = $_GET['end'] ?? null;

if (!$start || !$end) {
    echo json_encode(['status' => 'error', 'message' => 'Start and end dates are required.']);
    exit;
}

$orders = orders::findOrdersByDateRange($start, $end);
echo json_encode(['status' => 'success', 'orders' => $orders]);
exit;
