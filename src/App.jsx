import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Make sure this is imported
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart'; // Add this
import OrderSummary from './pages/OrderSummary'; // Add this

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Make sure CartProvider wraps everything */}
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} /> {/* Add this route */}
              <Route
                path="/order-summary"
                element={
                  <PrivateRoute>
                    <OrderSummary />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;