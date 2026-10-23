import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';
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
          <Search className="w-4 h-4 text-brand-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by city name or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-brand-sand rounded-xs text-brand-charcoal placeholder:text-brand-taupe focus:outline-none focus:border-brand-primary"
          />
        </div>

        {/* Popular Cities Grid */}
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-taupe block mb-2.5">
            Popular Cities
          </span>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {filteredCities.map((c) => {
              const active = c.name.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={c.id}
                  onClick={() => setCity(c.name)}
                  className={`p-2.5 text-left rounded-xs border text-xs transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-brand-primary-soft border-brand-primary text-brand-primary font-semibold'
                      : 'bg-white border-brand-sand hover:border-brand-taupe text-brand-charcoal'
                  }`}
                >
                  <div>
                    <span className="block font-medium">{c.name}</span>
                    <span className="text-[10px] text-brand-taupe">{c.state}</span>
                  </div>
                  {active && <Check className="w-4 h-4 text-brand-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enter PIN Code direct */}
        <div className="pt-3 border-t border-brand-sand">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-taupe block mb-2">
            Or Enter 6-Digit Delivery PIN Code
          </span>
          <form onSubmit={handleApplyPin} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 226001"
              value={customPin}
              onChange={(e) => setCustomPin(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-3 py-2 text-sm bg-white border border-brand-sand rounded-xs text-brand-charcoal focus:outline-none focus:border-brand-primary"
            />
            <button
              type="submit"
              disabled={customPin.length !== 6}
              className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xs disabled:opacity-50 hover:bg-brand-primary-dark transition-colors"
            >
              Set PIN
            </button>
          </form>
        </div>

        <p className="text-[11px] text-brand-taupe leading-relaxed">
          * Note: Service coverage & delivery charges depend on local warehouse inventory in your selected city.
        </p>
      </div>
    </Modal>
  );
};
