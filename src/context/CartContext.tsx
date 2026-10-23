import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { CartItem, CartTotals } from '../types/cart';
import { calculateItemSubtotal, calculateCartTotals } from '../utils/pricing';
import { calculateDaysBetween, getDefaultRentalDates } from '../utils/formatters';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    quantity?: number,
    dates?: { start: string; end: string },
    variantId?: string,
    variantName?: string
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateDates: (itemId: string, startDate: string, endDate: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = 'eventora_cart_items_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return getStorageItem<CartItem[]>(CART_STORAGE_KEY, []);
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, items);
  }, [items]);

  const totals = calculateCartTotals(items);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    product: Product,
    quantity: number = 1,
    dates?: { start: string; end: string },
    variantId?: string,
    variantName?: string
  ) => {
    const defaultDates = getDefaultRentalDates();
    const startDate = dates?.start || defaultDates.start;
    const endDate = dates?.end || defaultDates.end;
    const rentalDays = calculateDaysBetween(startDate, endDate);

    const compositeId = `${product.id}-${variantId || 'standard'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === compositeId);

      if (existingIndex > -1) {
        // Update existing item
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        const newSubtotal = calculateItemSubtotal(
          product.rentalPrice,
          newQty,
          existing.rentalDays,
          product.pricingUnit
        );
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          subtotal: newSubtotal,
        };
        return updated;
      }

      // Add new item
      const subtotal = calculateItemSubtotal(
        product.rentalPrice,
        quantity,
        rentalDays,
        product.pricingUnit
      );

      const newItem: CartItem = {
        id: compositeId,
        productId: product.id,
        product,
        variantId,
        variantName,
        quantity,
        startDate,
        endDate,
        rentalDays,
        unitPrice: product.rentalPrice,
        subtotal,
      };

      return [...prevItems, newItem];
    });

    setIsOpen(true);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const subtotal = calculateItemSubtotal(
            item.unitPrice,
            newQuantity,
            item.rentalDays,
            item.product.pricingUnit
          );
          return {
            ...item,
            quantity: newQuantity,
            subtotal,
          };
        }
        return item;
      })
    );
  };

  const updateDates = (itemId: string, startDate: string, endDate: string) => {
    const rentalDays = calculateDaysBetween(startDate, endDate);
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const subtotal = calculateItemSubtotal(
            item.unitPrice,
            item.quantity,
            rentalDays,
            item.product.pricingUnit
          );
          return {
            ...item,
            startDate,
            endDate,
            rentalDays,
            subtotal,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateQuantity,
        updateDates,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
