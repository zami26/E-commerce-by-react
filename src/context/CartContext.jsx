import { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create context
const CartContext = createContext();

// 2️⃣ Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3️⃣ Add to cart function with quantity parameter
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      // check if product already exists
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // add new product
      console.log("Added to cart:", product);
      return [...prev, { ...product, quantity }];
    });
  };

  // 4️⃣ Update quantity function
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // 5️⃣ Remove from cart function
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 6️⃣ Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  // 7️⃣ Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 8️⃣ Calculate item count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 9️⃣ Get single product from cart
  const getProductFromCart = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        getProductFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 4️⃣ Custom hook
export const useCart = () => useContext(CartContext);