import React, { useState, useEffect } from 'react';
import { Order } from '../types/swiggy';
import { useSwiggy } from '../context/SwiggyContext';
import { X, CheckCircle2, CookingPot, Bike, Home, PhoneCall, ShieldAlert, Sparkles } from 'lucide-react';

interface OrderTrackingModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  const { cancelActiveOrder } = useSwiggy();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [minsLeft, setMinsLeft] = useState<number>(24);

  useEffect(() => {
    // Progress step simulation
    const timer1 = setTimeout(() => setCurrentStep(2), 4000);
    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setMinsLeft(14);
    }, 9000);
    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      setMinsLeft(5);
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { title: 'Order Confirmed', desc: 'Restaurant accepted your order', icon: CheckCircle2 },
    { title: 'Preparing in Kitchen', desc: 'Chef is preparing your fresh meal', icon: CookingPot },
    { title: 'Out for Delivery', desc: 'Partner picked up your order', icon: Bike },
    { title: 'Delivered', desc: 'Enjoy your food!', icon: Home }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-extrabold text-slate-900 text-lg">Live Order Tracking</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Order #{order.orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          
          {/* Estimated Time Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-100">Estimated Arrival</div>
              <div className="text-2xl font-black text-white mt-1">
                {minsLeft} Mins
              </div>
              <div className="text-xs text-orange-100 mt-0.5">Arriving at {order.deliveryAddress.type}</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
              🛵
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 px-2">
            {steps.map((s, idx) => {
              const stepNum = idx + 1;
              const isDone = currentStep > stepNum;
              const isCurrent = currentStep === stepNum;
              const IconComp = s.icon;

              return (
                <div key={idx} className="flex items-start gap-4 relative">
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 bottom-0 w-0.5 ${
                        isDone ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-orange-500 text-white ring-4 ring-orange-100 shadow-md'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="pt-1">
                    <h4 className={`text-sm font-extrabold ${isCurrent ? 'text-slate-900' : 'text-slate-600'}`}>
                      {s.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Partner Info */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center">
                VR
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Vikram Ramesh</div>
                <div className="text-[11px] text-slate-500">Delivery Partner • rating 4.9 ★</div>
              </div>
            </div>
            <button className="p-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-orange-600 transition-colors shadow-xs cursor-pointer">
              <PhoneCall className="w-4 h-4" />
              <span>Call Partner</span>
            </button>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Order Items</h4>
            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-xs text-slate-700">
              {order.items.map(item => (
                <div key={item.cartItemId} className="flex items-center justify-between py-1">
                  <span>{item.quantity}x {item.menuItem.name}</span>
                  <span className="font-bold">₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-2 font-black text-slate-900 flex justify-between">
                <span>Total Paid</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={() => {
              cancelActiveOrder();
              onClose();
            }}
            className="flex-1 py-3 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors cursor-pointer"
          >
            Cancel Order
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-900 hover:bg-black text-white font-extrabold text-xs rounded-2xl transition-colors cursor-pointer"
          >
            Keep Tracked
          </button>
        </div>

      </div>
    </div>
  );
};
