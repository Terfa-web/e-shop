"use client";

interface CartProviderProps {
  children: React.ReactNode;
}

import { CartContextProvider } from "@/hooks/useCart";

const CartProvider = ({ children }: CartProviderProps) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
