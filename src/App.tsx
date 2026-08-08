import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import Header from './components/Header/Header';
import CheckoutHeader from './components/Header/CheckoutHeader';
import SignInDrawer from './components/SignInDrawer/SignInDrawer';
import Home from './pages/Home/Home';

// Route-level code splitting: keep the home page (first paint) in the main
// bundle, lazy-load everything else so the initial download stays small.
const Restaurant = lazy(() => import('./pages/Restaurant/Restaurant'));
const Search = lazy(() => import('./pages/Search/Search'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const OrderConfirmed = lazy(() => import('./pages/OrderConfirmed/OrderConfirmed'));
const Help = lazy(() => import('./pages/Help/Help'));
const Offers = lazy(() => import('./pages/Offers/Offers'));

function AppHeader() {
  const location = useLocation();
  return location.pathname === '/cart' ? <CheckoutHeader /> : <Header />;
}

export default function App() {
  return (
    <CartProvider>
      <UIProvider>
        <div className="min-h-screen bg-white">
          <AppHeader />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/search" element={<Search />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-confirmed" element={<OrderConfirmed />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </Suspense>
          <SignInDrawer />
        </div>
      </UIProvider>
    </CartProvider>
  );
}
