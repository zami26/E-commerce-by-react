import ReactDOM from "react-dom/client";
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <CartProvider>
    <App />
    </CartProvider>
  </HashRouter>
);
