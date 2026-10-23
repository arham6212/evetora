import React, { createContext, useContext, useState, useEffect } from 'react';
import { popularCities } from '../data/siteConfig';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface LocationContextType {
  city: string;
  pincode: string;
  setCity: (city: string) => void;
  setPincode: (pin: string) => void;
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
}

const LOCATION_STORAGE_KEY = 'eventora_location_v1';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<{ city: string; pincode: string }>(() => {
    return getStorageItem(LOCATION_STORAGE_KEY, {
      city: 'Lucknow',
      pincode: '226001',
    });
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    setStorageItem(LOCATION_STORAGE_KEY, location);
  }, [location]);

  const setCity = (cityName: string) => {
    const matched = popularCities.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );
    setLocation({
      city: cityName,
      pincode: matched ? matched.pincode : location.pincode,
    });
    setIsLocationModalOpen(false);
  };

  const setPincode = (pin: string) => {
    setLocation((prev) => ({
      ...prev,
      pincode: pin,
    }));
  };

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  return (
    <LocationContext.Provider
      value={{
        city: location.city,
        pincode: location.pincode,
        setCity,
        setPincode,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
