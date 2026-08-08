import React, { useState } from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { X, MapPin, Navigation, Check } from 'lucide-react';

const POPULAR_CITIES = [
  { name: 'Koramangala, Bengaluru', detail: 'Karnataka, India' },
  { name: 'Indiranagar, Bengaluru', detail: 'Karnataka, India' },
  { name: 'HSR Layout, Bengaluru', detail: 'Karnataka, India' },
  { name: 'Connaught Place, New Delhi', detail: 'Delhi NCR' },
  { name: 'Bandra West, Mumbai', detail: 'Maharashtra, India' },
  { name: 'Banjara Hills, Hyderabad', detail: 'Telangana, India' },
  { name: 'Koregaon Park, Pune', detail: 'Maharashtra, India' },
  { name: 'T Nagar, Chennai', detail: 'Tamil Nadu, India' }
];

export const LocationModal: React.FC = () => {
  const { locationModalOpen, setLocationModalOpen, currentLocation, setCurrentLocation } = useSwiggy();
  const [searchInput, setSearchInput] = useState('');

  if (!locationModalOpen) return null;

  const handleSelectLocation = (loc: string) => {
    setCurrentLocation(loc);
    setLocationModalOpen(false);
  };

  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setCurrentLocation('Koramangala 5th Block, Bengaluru (GPS Detected)');
          setLocationModalOpen(false);
        },
        () => {
          setCurrentLocation('Koramangala 5th Block, Bengaluru, Karnataka');
          setLocationModalOpen(false);
        }
      );
    } else {
      setCurrentLocation('Koramangala 5th Block, Bengaluru, Karnataka');
      setLocationModalOpen(false);
    }
  };

  const filteredLocations = searchInput
    ? POPULAR_CITIES.filter(c => c.name.toLowerCase().includes(searchInput.toLowerCase()))
    : POPULAR_CITIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span>Select Delivery Location</span>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Search Input */}
        <div className="relative mb-4">
          <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for area, street name..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all font-medium text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* GPS Location Button */}
        <button
          onClick={handleDetectGPS}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-orange-200 bg-orange-50/60 hover:bg-orange-50 text-orange-600 font-bold text-sm mb-6 transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </div>
          <div className="text-left">
            <div>Get current location</div>
            <div className="text-xs text-orange-500/80 font-normal">Using GPS</div>
          </div>
        </button>

        {/* Popular Cities list */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Popular Areas & Cities
          </h4>
          <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
            {filteredLocations.map((loc, idx) => {
              const fullStr = `${loc.name}, ${loc.detail}`;
              const isSelected = currentLocation.includes(loc.name);
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectLocation(fullStr)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200/60'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{loc.name}</div>
                      <div className="text-xs text-slate-500">{loc.detail}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
