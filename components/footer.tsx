import React from 'react';
import { useSwiggy } from '../context/SwiggyContext';

export const Footer: React.FC = () => {
  const { setActivePage } = useSwiggy();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top App Banner */}
        <div className="bg-slate-800/80 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700/50">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              For better experience, download the Swiggy app now
            </h3>
            <p className="text-slate-400 text-sm">
              Get live order tracking, exclusive discounts & faster checkout.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer hover:border-orange-500 transition-colors">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Get it on</div>
                <div className="text-sm font-bold text-white">Google Play</div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer hover:border-orange-500 transition-colors">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Download on the</div>
                <div className="text-sm font-bold text-white">App Store</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800 text-sm">
          
          {/* Col 1 */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-lg">
                S
              </div>
              <span className="font-black text-xl text-white">Swiggy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              © 2026 Swiggy Limited. All rights reserved. Built with passion for amazing food.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">Company</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">About Us</button></li>
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Swiggy Corporate</button></li>
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Careers</button></li>
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Team</button></li>
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Swiggy One</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">Contact Us</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Help & Support</button></li>
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Partner with us</button></li>
              <li><button onClick={() => setActivePage('help')} className="hover:text-orange-400 transition-colors">Ride with us</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">Available in</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>Bengaluru</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base">Life at Swiggy</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>Explore with Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables Blog</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-xs text-slate-500">
          Recreation of Swiggy UI for demonstration purposes • Clean Responsive Design
        </div>

      </div>
    </footer>
  );
};
