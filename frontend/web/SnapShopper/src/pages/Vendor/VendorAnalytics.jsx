import { useState } from "react";
import { BiMoney } from "react-icons/bi";
import { BsBarChart } from "react-icons/bs";
import { LuDownload, LuShoppingCart, LuStar, LuTrendingDown, LuTrendingUp, LuUsers } from "react-icons/lu";
import { PiMoney } from "react-icons/pi";

const VendorAnalytics = () => {
    const [timeRange, setTimeRange] = useState('7d');

    // Mock analytics data
    const analyticsData = {
        overview: {
            totalRevenue: 12847.50,
            revenueChange: 12.5,
            totalOrders: 847,
            ordersChange: 8.2,
            averageOrderValue: 127.50,
            aovChange: 5.3,
            customerSatisfaction: 4.8,
            satisfactionChange: 0.2
        },
        topProducts: [
            { id: 1, name: 'USB-C Cable', sales: 234, revenue: 4676.66, change: 15.2 },
            { id: 2, name: 'Gaming Keyboard', sales: 156, revenue: 23398.44, change: -3.1 },
            { id: 3, name: 'Premium Headphones', sales: 127, revenue: 38098.73, change: 24.7 },
            { id: 4, name: 'Wireless Mouse', sales: 89, revenue: 7119.11, change: 8.9 }
        ],
        salesData: [
            { date: '2024-03-10', orders: 12, revenue: 1250 },
            { date: '2024-03-11', orders: 18, revenue: 2100 },
            { date: '2024-03-12', orders: 15, revenue: 1800 },
            { date: '2024-03-13', orders: 22, revenue: 2800 },
            { date: '2024-03-14', orders: 19, revenue: 2300 },
            { date: '2024-03-15', orders: 25, revenue: 3200 },
            { date: '2024-03-16', orders: 20, revenue: 2650 }
        ],
        customerInsights: {
            newCustomers: 156,
            returningCustomers: 1091,
            retentionRate: 87,
            customerLifetimeValue: 234.50
        },
        categoryPerformance: [
            { category: 'Electronics', sales: 520, revenue: 45230, percentage: 68 },
            { category: 'Accessories', sales: 327, revenue: 12617, percentage: 32 }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatPercentage = (value) => {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    const getChangeColor = (change) => {
        return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
    };

    const getChangeIcon = (change) => {
        return change > 0 ? <LuTrendingUp className="w-4 h-4" /> :
            change < 0 ? <LuTrendingDown className="w-4 h-4" /> : null;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
                <div className="flex items-center gap-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        <LuDownload className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <PiMoney className="w-6 h-6 text-green-600" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.overview.revenueChange)}`}>
                            {getChangeIcon(analyticsData.overview.revenueChange)}
                            {formatPercentage(analyticsData.overview.revenueChange)}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(analyticsData.overview.totalRevenue)}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <LuShoppingCart className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.overview.ordersChange)}`}>
                            {getChangeIcon(analyticsData.overview.ordersChange)}
                            {formatPercentage(analyticsData.overview.ordersChange)}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalOrders}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <BsBarChart className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.overview.aovChange)}`}>
                            {getChangeIcon(analyticsData.overview.aovChange)}
                            {formatPercentage(analyticsData.overview.aovChange)}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Avg. Order Value</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(analyticsData.overview.averageOrderValue)}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <LuStar className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.overview.satisfactionChange)}`}>
                            {getChangeIcon(analyticsData.overview.satisfactionChange)}
                            {formatPercentage(analyticsData.overview.satisfactionChange)}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Customer Rating</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {analyticsData.overview.customerSatisfaction}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sales Chart and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <BsBarChart className="w-12 h-12 mx-auto mb-2" />
                            <p>Interactive sales chart would be rendered here</p>
                            <p className="text-sm">Showing revenue and orders over time</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
                    <div className="space-y-4">
                        {analyticsData.topProducts.map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{product.name}</p>
                                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                                    <div className={`flex items-center gap-1 text-sm ${getChangeColor(product.change)}`}>
                                        {getChangeIcon(product.change)}
                                        {formatPercentage(product.change)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Insights and Category Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Insights</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <LuUsers className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-blue-900">New Customers</span>
                            </div>
                            <span className="text-2xl font-bold text-blue-900">
                                {analyticsData.customerInsights.newCustomers}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <LuUsers className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-900">Returning Customers</span>
                            </div>
                            <span className="text-2xl font-bold text-green-900">
                                {analyticsData.customerInsights.returningCustomers}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <LuTrendingUp className="w-5 h-5 text-purple-600" />
                                <span className="font-medium text-purple-900">Retention Rate</span>
                            </div>
                            <span className="text-2xl font-bold text-purple-900">
                                {analyticsData.customerInsights.retentionRate}%
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <BiMoney className="w-5 h-5 text-orange-600" />
                                <span className="font-medium text-orange-900">Avg. Lifetime Value</span>
                            </div>
                            <span className="text-2xl font-bold text-orange-900">
                                {formatCurrency(analyticsData.customerInsights.customerLifetimeValue)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
                    <div className="space-y-6">
                        {analyticsData.categoryPerformance.map((category, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900">{category.category}</span>
                                    <span className="text-sm text-gray-600">{category.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${category.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>{category.sales} sales</span>
                                    <span>{formatCurrency(category.revenue)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-white">92%</span>
                        </div>
                        <p className="font-medium text-gray-900">Order Fulfillment Rate</p>
                        <p className="text-sm text-gray-600">On-time delivery performance</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-white">2.1%</span>
                        </div>
                        <p className="font-medium text-gray-900">Return Rate</p>
                        <p className="text-sm text-gray-600">Product return percentage</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-white">24h</span>
                        </div>
                        <p className="font-medium text-gray-900">Avg. Response Time</p>
                        <p className="text-sm text-gray-600">Customer inquiry response</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorAnalytics;