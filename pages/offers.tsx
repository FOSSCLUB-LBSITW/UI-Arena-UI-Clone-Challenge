import React, { useState } from 'react';
import { AVAILABLE_COUPONS } from '../data/mockData';
import { useSwiggy } from '../context/SwiggyContext';
import { Percent, Tag, Check, ArrowRight } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { applyCoupon, setActivePage } = useSwiggy();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApply = (code: string) => {
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
    setActivePage('cart');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full mb-3">
            <Percent className="w-4 h-4" />
            <span>OFFERS & DEALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Swiggy Coupon & Discount Deals
          </h1>
          <p className="text-xs text-orange-100 mt-1">
            Save big on your favorite meals with verified coupon codes.
          </p>
        </div>
        <div className="text-5xl hidden sm:block">🎁</div>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AVAILABLE_COUPONS.map(coupon => (
          <div
            key={coupon.code}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                    <Tag className="w-4 h-4" />
                  </div>
                  <span className="font-black text-slate-900 text-lg uppercase tracking-wider">
                    {coupon.code}
                  </span>
                </div>
                {copiedCode === coupon.code && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" /> Code Applied!
                  </span>
                )}
              </div>

              <p className="font-extrabold text-slate-800 text-sm mb-1">{coupon.description}</p>
              <p className="text-xs text-slate-500">Valid on orders above ₹{coupon.minOrderValue}</p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Terms & Conditions Apply</span>
              <button
                onClick={() => handleApply(coupon.code)}
                className="py-2.5 px-5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Apply Deal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
