import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaSignOutAlt, FaBoxOpen } from 'react-icons/fa';
import '../style/admin-login.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 🔹 SLUG GENERATOR (FIXED)
  const makeSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/['"]/g, '')
      .replace(/\s+/g, '-');
  };

  const [productData, setProductData] = useState({
    category: '',
    name: '',
    seller: '',
    price: '',
    stock: '',
    ratings: '',
    ratingsCount: '',
    img: '',
    shipping: '',
  });

  // 🔹 AUTH + FETCH PRODUCTS
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) navigate('/admin/login');

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast.error('Failed to load products'));
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // 🔹 ADD PRODUCT API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...productData,
      categorySlug: makeSlug(productData.category),
      price: Number(productData.price),
      stock: Number(productData.stock),
      ratings: Number(productData.ratings),
      ratingsCount: Number(productData.ratingsCount),
      shipping: Number(productData.shipping),
    };

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      const savedProduct = await res.json();
      setProducts([...products, savedProduct]);

      toast.success('Product added successfully!');
      setShowForm(false);
      setProductData({
        category: '',
        name: '',
        seller: '',
        price: '',
        stock: '',
        ratings: '',
        ratingsCount: '',
        img: '',
        shipping: '',
      });
    } catch {
      toast.error('Failed to add product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
    toast.info('Admin logged out');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <FaBoxOpen className="admin-logo" />
          <h1>Product Management Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <div className="admin-container">
        <div className="admin-sidebar">
          <button onClick={() => setShowForm(true)} className="add-product-btn">
            <FaPlus /> Add New Product
          </button>
          <div className="stats">
            <h3>Statistics</h3>
            <p>Total Products: {products.length}</p>
            <p>Low Stock: {products.filter(p => p.stock < 5).length}</p>
          </div>
        </div>

        <div className="admin-main">
          {showForm ? (
            <div className="product-form-container">
              <h2>Add New Product</h2>

              <form onSubmit={handleSubmit} className="product-form">
                <input name="category" placeholder="Category" value={productData.category} onChange={handleInputChange} required />
                <input name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} required />
                <input name="seller" placeholder="Seller" value={productData.seller} onChange={handleInputChange} required />
                <input name="price" type="number" placeholder="Price" value={productData.price} onChange={handleInputChange} required />
                <input name="stock" type="number" placeholder="Stock" value={productData.stock} onChange={handleInputChange} required />
                <input name="ratings" type="number" step="0.1" placeholder="Ratings" value={productData.ratings} onChange={handleInputChange} required />
                <input name="ratingsCount" type="number" placeholder="Ratings Count" value={productData.ratingsCount} onChange={handleInputChange} required />
                <input name="img" type="url" placeholder="Image URL" value={productData.img} onChange={handleInputChange} required />
                <input name="shipping" type="number" placeholder="Shipping Cost" value={productData.shipping} onChange={handleInputChange} required />

                <button type="submit" className="submit-btn">Add Product</button>
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
              </form>
            </div>
          ) : (
            <div className="products-list">
              <h2>Product List</h2>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product._id} className="product-card">
                    <img src={product.img} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
