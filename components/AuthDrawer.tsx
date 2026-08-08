import React, { useState } from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { X, Phone, Lock, User, Wallet, Sparkles, MapPin, Clock, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';

export const AuthDrawer: React.FC = () => {
  const {
    authDrawerOpen,
    setAuthDrawerOpen,
    user,
    loginUser,
    logoutUser,
    orderHistory,
    favorites,
    restaurants,
    setSelectedRestaurantId,
    setActivePage
  } = useSwiggy();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  if (!authDrawerOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setStep('otp');
    setOtpInput('1234'); // Pre-fill mock OTP for smooth testing
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === '1234' || otpInput.length === 4) {
      loginUser(`+91 ${phoneNumber}`, nameInput || 'Swiggy Foodie');
      setStep('phone');
      setPhoneNumber('');
      setNameInput('');
      setOtpInput('');
      setOtpError('');
    } else {
      setOtpError('Invalid OTP code. Try entering 1234.');
    }
  };

  const handleReorder = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setActivePage('restaurant');
    setAuthDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setAuthDrawerOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left">
          
          {/* Top Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setAuthDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="font-extrabold text-slate-900 text-lg">
              {user ? 'My Account' : 'Login / Sign up'}
            </div>
            <div className="w-8" />
          </div>

          {/* Body Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {user ? (
              /* LOGGED IN ACCOUNT VIEW */
              <div className="space-y-6">
                
                {/* User Profile Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-white">{user.name}</h3>
                        <p className="text-xs text-slate-300">{user.phone}</p>
                      </div>
                    </div>
                  </div>

                  {user.swiggyOneMember && (
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Swiggy One Member • Free Delivery Active</span>
                    </div>
                  )}
                </div>

                {/* Swiggy Money Wallet */}
                <div className="bg-orange-50/80 border border-orange-200/60 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Swiggy Money</div>
                      <div className="text-lg font-black text-slate-900">₹{user.swiggyMoneyBalance}</div>
                    </div>
                  </div>
                  <button className="bg-white hover:bg-orange-100 text-orange-600 border border-orange-300 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer">
                    + Add Money
                  </button>
                </div>

                {/* Saved Addresses */}
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-3 flex items-center justify-between text-sm">
                    <span>Saved Delivery Addresses</span>
                    <span className="text-xs text-orange-500 font-bold cursor-pointer">+ Add New</span>
                  </h4>
                  <div className="space-y-2">
                    {user.addresses.map(addr => (
                      <div key={addr.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">{addr.type}</div>
                          <div className="text-slate-600">{addr.addressLine}, {addr.area}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order History */}
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-3 text-sm">Past Orders History</h4>
                  {orderHistory.length === 0 ? (
                    <p className="text-xs text-slate-500">No past orders yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orderHistory.slice(0, 3).map(order => (
                        <div key={order.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-slate-900 text-sm">{order.restaurantName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                              {order.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mb-3 flex items-center justify-between">
                            <span>{order.date} • ₹{order.totalAmount}</span>
                            <span>{order.items.length} items</span>
                          </div>
                          <button
                            onClick={() => handleReorder(order.restaurantId)}
                            className="w-full py-2 bg-slate-100 hover:bg-orange-50 text-slate-900 hover:text-orange-600 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Reorder Dishes</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={logoutUser}
                  className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-8"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Account</span>
                </button>

              </div>
            ) : (
              /* LOG IN / SIGN UP FORM */
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">Login or Sign up</h2>
                    <p className="text-xs text-slate-500">Get trackable food deliveries right at your doorstep.</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl shrink-0">
                    🍔
                  </div>
                </div>

                {step === 'phone' ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name (Optional)</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={nameInput}
                          onChange={e => setNameInput(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-hidden focus:border-orange-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter 10-digit mobile number"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          required
                          className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-hidden focus:border-orange-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={phoneNumber.length < 10}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer uppercase tracking-wider mt-4"
                    >
                      Continue
                    </button>

                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                      By continuing, you agree to Swiggy's <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>.
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-orange-800 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                        <span>OTP Sent to +91 {phoneNumber}</span>
                      </div>
                      <p className="text-[11px] text-orange-600">
                        Enter <strong>1234</strong> to verify instantly.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">One Time Password (OTP)</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="4-digit OTP"
                          value={otpInput}
                          onChange={e => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          required
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-lg tracking-widest font-black focus:outline-hidden focus:border-orange-500 focus:bg-white text-center"
                        />
                      </div>
                      {otpError && <p className="text-xs text-red-500 mt-1 font-semibold">{otpError}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Verify & Proceed
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="w-full text-xs text-slate-500 hover:text-orange-500 font-bold text-center py-2 cursor-pointer"
                    >
                      Edit Phone Number
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
