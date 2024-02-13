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
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleProductQuantityIncrease: (product: CartProductType) => void;
  handleProductQuantityDecrease: (product: CartProductType) => void;
  clearCart: () => void;
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
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const productsInStorage: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(productsInStorage);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotalPrice = item.price * item.quantity;

            acc.total += itemTotalPrice;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );

        setCartTotalQuantity(qty);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  console.log(cartTotalQuantity, "cart total quantity");
  console.log(cartTotalAmount, "cart total Amount");

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

  const clearCart = useCallback(() => {
    setCartProducts(null);

    setCartTotalQuantity(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleProductQuantityIncrease,
    handleProductQuantityDecrease,
    clearCart,
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
