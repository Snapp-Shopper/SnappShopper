import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { LuBell, LuCreditCard, LuGlobe, LuMail, LuPhone, LuSave, LuShield } from "react-icons/lu";

const VendorSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [settings, setSettings] = useState({
        // Business Profile
        businessName: 'Tech Solutions Store',
        ownerName: 'John Doe',
        email: 'john@techsolutions.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business St, Suite 100, City, State 12345',
        description: 'We specialize in high-quality electronics and tech accessories, providing excellent customer service and competitive prices.',
        website: 'https://techsolutions.com',
        taxId: '12-3456789',

        // Store Settings
        businessHours: '9:00 AM - 6:00 PM',
        timeZone: 'EST (UTC-5)',
        currency: 'USD',

        // Payment Methods
        acceptsCreditCards: true,
        acceptsPayPal: true,
        acceptsBankTransfer: false,
        acceptsCrypto: false,

        // Shipping
        standardShippingCost: 5.99,
        expressShippingCost: 12.99,
        freeShippingThreshold: 50,

        // Notifications
        emailOrderNotifications: true,
        emailPaymentNotifications: true,
        emailInventoryNotifications: true,
        emailMarketingNotifications: false,
        smsNotifications: true,

        // Privacy & Security
        twoFactorEnabled: false,
        profileVisibility: 'public',
        dataRetentionPeriod: '2 years'
    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleInputChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Business Profile', icon: LuGlobe },
        { id: 'payment', label: 'Payment & Shipping', icon: LuCreditCard },
        { id: 'notifications', label: 'Notifications', icon: LuBell },
        { id: 'security', label: 'Security & Privacy', icon: LuShield }
    ];

    const renderProfileTab = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Business Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <input
                        type="text"
                        value={settings.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                    <input
                        type="text"
                        value={settings.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <textarea
                        rows="3"
                        value={settings.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                        type="url"
                        value={settings.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                    <input
                        type="text"
                        value={settings.taxId}
                        onChange={(e) => handleInputChange('taxId', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                    <textarea
                        rows="4"
                        value={settings.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );

    const renderPaymentTab = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Payment & Shipping Settings</h2>

            {/* Payment Methods */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Accepted Payment Methods</h3>
                <div className="space-y-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.acceptsCreditCards}
                            onChange={(e) => handleInputChange('acceptsCreditCards', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-gray-700">Credit/Debit Cards</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.acceptsPayPal}
                            onChange={(e) => handleInputChange('acceptsPayPal', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-gray-700">PayPal</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.acceptsBankTransfer}
                            onChange={(e) => handleInputChange('acceptsBankTransfer', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-gray-700">Bank Transfer</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.acceptsCrypto}
                            onChange={(e) => handleInputChange('acceptsCrypto', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-gray-700">Cryptocurrency</span>
                    </label>
                </div>
            </div>

            {/* Shipping Options */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={settings.standardShippingCost}
                            onChange={(e) => handleInputChange('standardShippingCost', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Express Shipping ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={settings.expressShippingCost}
                            onChange={(e) => handleInputChange('expressShippingCost', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={settings.freeShippingThreshold}
                            onChange={(e) => handleInputChange('freeShippingThreshold', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Store Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                    <select
                        value={settings.businessHours}
                        onChange={(e) => handleInputChange('businessHours', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</option>
                        <option value="8:00 AM - 8:00 PM">8:00 AM - 8:00 PM</option>
                        <option value="24/7 Online">24/7 Online</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select
                        value={settings.timeZone}
                        onChange={(e) => handleInputChange('timeZone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="EST (UTC-5)">EST (UTC-5)</option>
                        <option value="PST (UTC-8)">PST (UTC-8)</option>
                        <option value="CST (UTC-6)">CST (UTC-6)</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                    <label className="flex items-center justify-between">
                        <div className="flex items-center">
                            <LuMail className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <span className="text-gray-700">Order Notifications</span>
                                <p className="text-sm text-gray-500">Get notified when you receive new orders</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.emailOrderNotifications}
                            onChange={(e) => handleInputChange('emailOrderNotifications', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </label>

                    <label className="flex items-center justify-between">
                        <div className="flex items-center">
                            <LuCreditCard className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <span className="text-gray-700">Payment Notifications</span>
                                <p className="text-sm text-gray-500">Receive alerts for payment confirmations</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.emailPaymentNotifications}
                            onChange={(e) => handleInputChange('emailPaymentNotifications', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </label>

                    <label className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FiAlertCircle className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <span className="text-gray-700">Inventory Alerts</span>
                                <p className="text-sm text-gray-500">Low stock and out of stock notifications</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.emailInventoryNotifications}
                            onChange={(e) => handleInputChange('emailInventoryNotifications', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </label>

                    <label className="flex items-center justify-between">
                        <div className="flex items-center">
                            <LuBell className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <span className="text-gray-700">Marketing Updates</span>
                                <p className="text-sm text-gray-500">Platform updates and promotional opportunities</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.emailMarketingNotifications}
                            onChange={(e) => handleInputChange('emailMarketingNotifications', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </label>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
                <label className="flex items-center justify-between">
                    <div className="flex items-center">
                        <LuPhone className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                            <span className="text-gray-700">SMS Alerts</span>
                            <p className="text-sm text-gray-500">Urgent notifications via SMS</p>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                    />
                </label>
            </div>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Security & Privacy</h2>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
                <div className="space-y-4">
                    <label className="flex items-center justify-between">
                        <div>
                            <span className="text-gray-700">Two-Factor Authentication</span>
                            <p className="text-sm text-gray-500">Add extra security to your account</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.twoFactorEnabled}
                            onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </label>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                        <select
                            value={settings.profileVisibility}
                            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="public">Public</option>
                            <option value="limited">Limited</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
                        <select
                            value={settings.dataRetentionPeriod}
                            onChange={(e) => handleInputChange('dataRetentionPeriod', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="1 year">1 year</option>
                            <option value="2 years">2 years</option>
                            <option value="5 years">5 years</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
                <div className="space-y-4">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Delete Account
                    </button>
                    <p className="text-sm text-red-700">
                        This action cannot be undone. All your data will be permanently deleted.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile': return renderProfileTab();
            case 'payment': return renderPaymentTab();
            case 'notifications': return renderNotificationsTab();
            case 'security': return renderSecurityTab();
            default: return renderProfileTab();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                {saved && (
                    <div className="flex items-center gap-2 text-green-600">
                        <BsCheckCircle className="w-5 h-5" />
                        <span>Settings saved successfully!</span>
                    </div>
                )}
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTabContent()}

                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 mt-8">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            <LuSave className="w-4 h-4" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorSettings;
