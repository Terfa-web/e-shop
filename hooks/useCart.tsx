import { CartProductType } from "@/app/product/[productId]/ProductDetials";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleProductQuantityIncrease: (product: CartProductType) => void;
  handleProductQuantityDecrease: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const productsInStorage: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(productsInStorage);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      setCartTotalQuantity((prev) => prev + 1);
      toast.success("Product added to cart");
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );

        setCartProducts(filteredProducts);
        toast.success("Product removed from cart");
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleProductQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99) return toast.error("Oops Maximum reached");

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1)
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;

        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItem", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleProductQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 1) return toast.error("Oops Minimum reached");

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1)
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;

        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItem", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const value = {
    cartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleProductQuantityIncrease,
    handleProductQuantityDecrease,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CarContextProvider");
  }

  return context;
};
