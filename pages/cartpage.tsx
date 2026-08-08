import React, { useState } from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { OrderTrackingModal } from '../components/OrderTrackingModal';
import {
  ShoppingBag,
  MapPin,
  Tag,
  Check,
  X,
  CreditCard,
  Building2,
  Wallet,
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  ShieldCheck
} from 'lucide-react';
import { AVAILABLE_COUPONS } from '../data/mockData';
import { DeliveryAddress } from '../types/swiggy';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartRestaurant,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    user,
    setAuthDrawerOpen,
    placeOrder,
    setActivePage
  } = useSwiggy();

  const [couponInput, setCouponInput] = useState('');
  const [cookingInstruction, setCookingInstruction] = useState('');
  const [tipAmount, setTipAmount] = useState<number>(30);
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(
    user?.addresses[0] || {
      id: 'addr-default',
      type: 'Home',
      addressLine: 'Flat 402, Sunshine Apartments, 5th Block',
      area: 'Koramangala',
      city: 'Bengaluru'
    }
  );
  const [paymentMethod, setPaymentMethod] = useState<string>('Swiggy Pay UPI');
  const [placedOrderModal, setPlacedOrderModal] = useState<any>(null);

  const itemTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Discount math
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (itemTotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount) discount = Math.min(discount, appliedCoupon.maxDiscount);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const deliveryFee = user?.swiggyOneMember ? 0 : 35;
  const platformFee = 6;
  const taxes = Math.round(itemTotal * 0.05);
  const grandTotal = Math.max(0, itemTotal - discount + deliveryFee + platformFee + taxes + tipAmount);

  const handleApplyCouponCode = (code: string) => {
    setCouponInput(code);
    applyCoupon(code);
  };

  const handleCheckout = () => {
    if (!user) {
      setAuthDrawerOpen(true);
      return;
    }
    const order = placeOrder(selectedAddress, paymentMethod, tipAmount);
    setPlacedOrderModal(order);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-4 text-4xl shadow-xs">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your cart is empty</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
          You can go to home page to view more restaurants and add delicious dishes to your cart.
        </p>
        <button
          onClick={() => setActivePage('home')}
          className="mt-6 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer inline-block"
        >
          SEE RESTAURANTS NEAR YOU
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Checkout & Cart Summary
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ordering from <strong className="text-slate-900">{cartRestaurant?.name}</strong>
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Delivery Address & Order Items */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Address Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <h2 className="font-black text-slate-900 text-base mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>Select Delivery Address</span>
            </h2>

            {user?.addresses && user.addresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddress.id === addr.id
                        ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs">{addr.type}</span>
                      {selectedAddress.id === addr.id && <Check className="w-4 h-4 text-orange-500" />}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {addr.addressLine}, {addr.area}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                {selectedAddress.addressLine}, {selectedAddress.area}
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <h2 className="font-black text-slate-900 text-base mb-4">Selected Dishes</h2>
            
            <div className="divide-y divide-slate-100">
              {cart.map(item => (
                <div key={item.cartItemId} className="py-4 flex items-start justify-between gap-4">
                  
                  {/* Left info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-xs border flex items-center justify-center ${
                          item.menuItem.type === 'veg' ? 'border-emerald-600' : 'border-red-600'
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            item.menuItem.type === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        />
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.menuItem.name}</h4>
                    </div>

                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.selectedOptions.map(o => o.optionName).join(', ')}
                      </p>
                    )}

                    <div className="text-xs font-black text-slate-900 mt-1">
                      ₹{item.unitPrice * item.quantity}
                      <span className="text-slate-400 font-normal ml-1">
                        (₹{item.unitPrice} each)
                      </span>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center text-xs font-black text-slate-900 py-1.5 px-3">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-slate-500 hover:text-orange-500 cursor-pointer pr-2"
                      >
                        -
                      </button>
                      <span className="px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-slate-500 hover:text-orange-500 cursor-pointer pl-2"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Cooking Instructions input */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Add Cooking Instructions / Request
              </label>
              <input
                type="text"
                placeholder="e.g. Please send extra chutney & cutlery..."
                value={cookingInstruction}
                onChange={e => setCookingInstruction(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          {/* Delivery Partner Tip Section */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <h3 className="font-black text-slate-900 text-sm mb-1">Say thanks with a Tip</h3>
            <p className="text-xs text-slate-500 mb-3">Day & night, our delivery partners work hard for you.</p>
            
            <div className="flex items-center gap-3">
              {[0, 20, 30, 50].map(amt => (
                <button
                  key={amt}
                  onClick={() => setTipAmount(amt)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    tipAmount === amt
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {amt === 0 ? 'No Tip' : `₹${amt}`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Coupons, Payment & Bill Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Coupon Code Section */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <h3 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-500" />
              <span>Apply Promo Coupon</span>
            </h3>

            {appliedCoupon ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-emerald-800 uppercase">
                    '{appliedCoupon.code}' APPLIED!
                  </div>
                  <div className="text-[11px] text-emerald-700">{appliedCoupon.description}</div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 uppercase p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-extrabold focus:outline-hidden focus:border-orange-500"
                  />
                  <button
                    onClick={() => applyCoupon(couponInput)}
                    className="px-5 py-3 bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase rounded-2xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-500 font-bold">{couponError}</p>}

                {/* Available Quick Coupon Pills */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Available Offers
                  </span>
                  {AVAILABLE_COUPONS.map(c => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCouponCode(c.code)}
                      className="w-full text-left p-3 rounded-2xl border border-dashed border-orange-300 bg-orange-50/40 hover:bg-orange-50 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-black text-orange-600">{c.code}</div>
                        <div className="text-[11px] text-slate-600">{c.description}</div>
                      </div>
                      <span className="text-xs text-orange-600 font-bold">APPLY</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <h3 className="font-black text-slate-900 text-base mb-3">Select Payment Method</h3>
            <div className="space-y-2">
              {['Swiggy Pay UPI', 'Credit / Debit Card', 'Netbanking', 'Cash on Delivery'].map(pm => (
                <button
                  key={pm}
                  onClick={() => setPaymentMethod(pm)}
                  className={`w-full p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === pm
                      ? 'border-orange-500 bg-orange-50/60 text-orange-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="w-4 h-4 text-orange-500" />
                    <span>{pm}</span>
                  </div>
                  {paymentMethod === pm && <Check className="w-4 h-4 text-orange-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Bill Breakdown Details */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 space-y-3">
            <h3 className="font-black text-slate-900 text-base mb-2">Bill Details</h3>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Item Total</span>
              <span className="font-bold text-slate-900">₹{itemTotal}</span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-600 font-bold">
                <span>Coupon Discount</span>
                <span>-₹{Math.round(discount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <span>Delivery Fee</span>
                {user?.swiggyOneMember && (
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
                    FREE
                  </span>
                )}
              </span>
              <span className="font-bold text-slate-900">
                {deliveryFee === 0 ? <span className="line-through text-slate-400">₹35</span> : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Platform Fee</span>
              <span className="font-bold text-slate-900">₹{platformFee}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>GST and Restaurant Charges (5%)</span>
              <span className="font-bold text-slate-900">₹{taxes}</span>
            </div>

            {tipAmount > 0 && (
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Delivery Tip</span>
                <span className="font-bold text-slate-900">₹{tipAmount}</span>
              </div>
            )}

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-base font-black text-slate-900">
              <span>To Pay</span>
              <span className="text-xl text-orange-600">₹{grandTotal}</span>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-orange-500/25 transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <span>Pay & Place Order • ₹{grandTotal}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Safe & Secure Payments</span>
            </div>

          </div>

        </div>

      </div>

      {/* Order Placed Tracking Dialog */}
      {placedOrderModal && (
        <OrderTrackingModal
          order={placedOrderModal}
          onClose={() => setPlacedOrderModal(null)}
        />
      )}

    </div>
  );
};
