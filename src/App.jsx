import { useState, useEffect } from "react";
import { CartProvider } from "./CartContext";
import Header from "./components/Header";
import SignInDrawer from "./components/SignInDrawer";
import CartBar from "./components/CartBar";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Help from "./pages/Help";

function parseRoute(hash) {
  const path = hash.replace(/^#/, "") || "/";
  const restaurantMatch = path.match(/^\/restaurant\/(.+)$/);
  if (restaurantMatch) return { name: "restaurant", id: restaurantMatch[1] };
  if (path === "/cart") return { name: "cart" };
  if (path === "/checkout") return { name: "checkout" };
  if (path === "/search") return { name: "search" };
  if (path === "/help") return { name: "help" };
  return { name: "home" };
}

export default function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function renderPage() {
    switch (route.name) {
      case "restaurant":
        return <Restaurant id={route.id} />;
      case "cart":
        return <CartPage />;
      case "checkout":
        return <Checkout />;
      case "search":
        return <Search />;
      case "help":
        return <Help />;
      default:
        return <Home />;
    }
  }

  const isCheckout = route.name === "checkout";

  return (
    <CartProvider>
      {!isCheckout && (
        <Header onOpenSignIn={() => setSignInOpen(true)} showTopSearch={route.name !== "search"} />
      )}
      {renderPage()}
      <CartBar hidden={route.name === "cart" || isCheckout} />
      <SignInDrawer open={signInOpen} onClose={() => setSignInOpen(false)} />
    </CartProvider>
  );
}
