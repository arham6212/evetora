import React, { useState } from 'react';
import { Search, Check, MapPin } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { popularCities } from '../../../data/siteConfig';
import { useLocationContext } from '../../../context/LocationContext';

export const LocationModal: React.FC = () => {
  const { city, pincode, setCity, setPincode, isLocationModalOpen, closeLocationModal } =
    useLocationContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [customPin, setCustomPin] = useState(pincode);

  const filteredCities = popularCities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pincode.includes(searchTerm)
  );

  const handleApplyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPin.trim().length === 6) {
      setPincode(customPin.trim());
      closeLocationModal();
    }
  };

  return (
    <Modal
      isOpen={isLocationModalOpen}
      onClose={closeLocationModal}
      title="Select Your City or Area"
      subtitle="Local Rental Service Availability"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by city name or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>

        {/* Popular Cities Grid */}
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-2.5">
            Popular Cities
          </span>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {filteredCities.map((c) => {
              const active = c.name.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={c.id}
                  onClick={() => setCity(c.name)}
                  className={`p-3 text-left rounded-xl border text-xs transition-all flex items-center justify-between ${
                    active
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <span className="block font-bold">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.state}</span>
                  </div>
                  {active && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enter PIN Code direct */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-2">
            Or Enter 6-Digit Delivery PIN Code
          </span>
          <form onSubmit={handleApplyPin} className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 226001"
                value={customPin}
                onChange={(e) => setCustomPin(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={customPin.length !== 6}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-colors shadow-xs"
            >
              Set PIN
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
