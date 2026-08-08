import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import SignInDrawer from "./components/SignInDrawer";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Help from "./pages/Help";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <SignInDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
