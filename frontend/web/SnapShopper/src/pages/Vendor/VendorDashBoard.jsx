import React, { useState } from 'react'
import { BiMoney } from 'react-icons/bi';
import { LuCircleCheck, LuClock, LuPackage, LuShoppingCart, LuTrendingUp, LuTriangleAlert, LuUsers } from 'react-icons/lu';

const VendorDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 12847,
    totalOrders: 847,
    totalProducts: 4,
    totalCustomers: 1247,
    revenueGrowth: 12.5,
    ordersGrowth: 8.2,
    newProducts: 3,
    newCustomers: 18
  });

  const [recentOrders] = useState([
    { id: '#ORD-001', customer: 'John Doe', product: 'Premium Headphones', amount: 299.99, status: 'pending', date: '2024-03-15' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Wireless Mouse', amount: 79.99, status: 'shipped', date: '2024-03-14' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'USB-C Cable', amount: 19.99, status: 'delivered', date: '2024-03-13' },
    { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Gaming Keyboard', amount: 149.99, status: 'processing', date: '2024-03-12' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Wireless Mouse', amount: 79.99, status: 'delivered', date: '2024-03-11' }
  ]);

  const [lowStockProducts] = useState([
    { id: 1, name: 'Wireless Mouse', stock: 23 },
    { id: 2, name: 'Gaming Keyboard', stock: 0 }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <LuClock className="w-4 h-4" />;
      case 'shipped': return <LuTrendingUp className="w-4 h-4" />;
      case 'delivered': return <LuCircleCheck  className="w-4 h-4" />;
      case 'processing': return <LuTriangleAlert className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BiMoney className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+{stats.revenueGrowth}% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <LuShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">+{stats.ordersGrowth}% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <LuPackage className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-purple-600 mt-2">+{stats.newProducts} new this week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <LuUsers className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-orange-600 mt-2">+{stats.newCustomers} new customers</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-600">{order.product}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">${order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Low Stock Alert</h2>
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-3">
                <LuTriangleAlert className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.stock === 0 ? 'Out of stock' : `${product.stock} units remaining`}
                  </p>
                </div>
              </div>
              <button className="text-sm font-medium text-red-600 hover:text-red-700">
                Restock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

