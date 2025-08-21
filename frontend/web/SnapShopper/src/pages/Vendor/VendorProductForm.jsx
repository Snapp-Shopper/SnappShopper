import { useEffect, useState } from "react";
import { LuCamera, LuSave, LuUpload, LuX } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";

const VendorProductForm = ({ mode = 'add' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    sku: '',
    weight: '',
    dimensions: '',
    seoTitle: '',
    metaDescription: '',
    tags: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // Mock product data for edit mode
  useEffect(() => {
    if (isEdit && id) {
      // In a real app, you'd fetch the product data from your API
      const mockProduct = {
        id: id,
        name: 'Premium Headphones',
        price: '299.99',
        stock: '45',
        category: 'Electronics',
        description: 'High-quality wireless headphones with noise cancellation.',
        sku: 'PH-001',
        weight: '350',
        dimensions: '20x15x8',
        seoTitle: 'Premium Wireless Headphones - Best Quality Audio',
        metaDescription: 'Experience crystal clear audio with our premium wireless headphones featuring advanced noise cancellation technology.',
        tags: 'headphones, wireless, audio, electronics',
        status: 'active'
      };
      setProductForm(mockProduct);
    }
  }, [isEdit, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!productForm.name.trim()) newErrors.name = 'Product name is required';
    if (!productForm.price || parseFloat(productForm.price) <= 0) newErrors.price = 'Valid price is required';
    if (!productForm.stock || parseInt(productForm.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!productForm.category) newErrors.category = 'Category is required';
    if (!productForm.description.trim()) newErrors.description = 'Description is required';
    if (!productForm.sku.trim()) newErrors.sku = 'SKU is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you'd make an API call here
      console.log('Saving product:', productForm);

      navigate('/vendor/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/vendor/products');
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Beauty & Personal Care',
    'Automotive',
    'Tools & Hardware',
    'Toys & Games',
    'Health & Wellness'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <Link
          to="/vendor/products"
          className="text-gray-600 hover:text-gray-800"
        >
          <LuX className="w-6 h-6" />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.price ? 'border-red-300' : 'border-gray-200'
                        }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.stock ? 'border-red-300' : 'border-gray-200'
                        }`}
                      placeholder="0"
                      min="0"
                    />
                    {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.category ? 'border-red-300' : 'border-gray-200'
                        }`}
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={productForm.sku}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.sku ? 'border-red-300' : 'border-gray-200'
                        }`}
                      placeholder="Product SKU"
                    />
                    {errors.sku && <p className="text-red-600 text-sm mt-1">{errors.sku}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.description ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Enter product description"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (grams)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={productForm.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Product weight"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions (L×W×H cm)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={productForm.dimensions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., 20x15x8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images and Additional Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Images & Additional Info</h2>

              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <LuCamera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">Upload Product Images</p>
                    <p className="text-gray-600">Drag & drop images or click to browse</p>
                    <p className="text-sm text-gray-500">Recommended: 800x800px, max 2MB per image</p>
                  </div>
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto"
                  >
                    <LuUpload className="w-4 h-4" />
                    Choose Files
                  </button>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">SEO Settings</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={productForm.seoTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="SEO optimized title"
                    maxLength="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {productForm.seoTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={productForm.metaDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Brief description for search engines"
                    maxLength="160"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {productForm.metaDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={productForm.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="comma, separated, tags"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate tags with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={productForm.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              <LuSave className="w-4 h-4" />
              {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Save Product')}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="border border-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            {isEdit && (
              <button
                type="button"
                className="ml-auto text-red-600 hover:text-red-700"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this product?')) {
                    navigate('/vendor/products');
                  }
                }}
              >
                Delete Product
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};



export default VendorProductForm;