import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { LuClock, LuDownload, LuEye, LuMail, LuPackage, LuSearch, LuTruck } from "react-icons/lu";

const VendorOrders = () => {
    const [orders, setOrders] = useState([
        {
            id: '#ORD-001',
            customer: 'John Doe',
            email: 'john@email.com',
            product: 'Premium Headphones',
            quantity: 1,
            amount: 299.99,
            status: 'pending',
            date: '2024-03-15',
            shippingAddress: '123 Main St, City, State 12345',
            paymentMethod: 'Credit Card'
        },
        {
            id: '#ORD-002',
            customer: 'Jane Smith',
            email: 'jane@email.com',
            product: 'Wireless Mouse',
            quantity: 2,
            amount: 159.98,
            status: 'shipped',
            date: '2024-03-14',
            shippingAddress: '456 Oak Ave, City, State 12345',
            paymentMethod: 'PayPal',
            trackingNumber: 'TRK123456789'
        },
        {
            id: '#ORD-003',
            customer: 'Mike Johnson',
            email: 'mike@email.com',
            product: 'USB-C Cable',
            quantity: 3,
            amount: 59.97,
            status: 'delivered',
            date: '2024-03-13',
            shippingAddress: '789 Pine St, City, State 12345',
            paymentMethod: 'Credit Card',
            trackingNumber: 'TRK987654321'
        },
        {
            id: '#ORD-004',
            customer: 'Sarah Wilson',
            email: 'sarah@email.com',
            product: 'Gaming Keyboard',
            quantity: 1,
            amount: 149.99,
            status: 'processing',
            date: '2024-03-12',
            shippingAddress: '321 Elm St, City, State 12345',
            paymentMethod: 'Credit Card'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedOrders, setSelectedOrders] = useState([]);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <LuClock className="w-4 h-4" />;
            case 'processing': return <LuPackage className="w-4 h-4" />;
            case 'shipped': return <LuTruck className="w-4 h-4" />;
            case 'delivered': return <BsCheckCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleSelectOrder = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(filteredOrders.map(order => order.id));
        }
    };

    const sendStatusUpdate = (orderId) => {
        // Mock email functionality
        const order = orders.find(o => o.id === orderId);
        alert(`Status update email sent to ${order.email} for order ${orderId}`);
    };

    const orderStats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0)
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
                <div className="flex items-center gap-2">
                    {selectedOrders.length > 0 && (
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            Bulk Actions ({selectedOrders.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-600">Processing</p>
                    <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-600">Shipped</p>
                    <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">${orderStats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search orders, customers, or products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <LuDownload className="w-4 h-4" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-4 px-6">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                </th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Order ID</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Customer</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Product</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Qty</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Amount</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-4 px-6">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => handleSelectOrder(order.id)}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                                    <td className="py-4 px-6">
                                        <div>
                                            <p className="font-medium text-gray-900">{order.customer}</p>
                                            <p className="text-sm text-gray-600">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{order.product}</td>
                                    <td className="py-4 px-6 text-gray-600">{order.quantity}</td>
                                    <td className="py-4 px-6 font-medium text-gray-900">${order.amount}</td>
                                    <td className="py-4 px-6">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{order.date}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {/* Open order details modal */ }}
                                                className="text-gray-400 hover:text-blue-600"
                                                title="View order details"
                                            >
                                                <LuEye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => sendStatusUpdate(order.id)}
                                                className="text-gray-400 hover:text-green-600"
                                                title="Send status update email"
                                            >
                                                <LuMail className="w-4 h-4" />
                                            </button>
                                            {order.trackingNumber && (
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(order.trackingNumber)}
                                                    className="text-gray-400 hover:text-purple-600"
                                                    title={`Copy tracking: ${order.trackingNumber}`}
                                                >
                                                    <LuTruck className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No orders found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorOrders;
