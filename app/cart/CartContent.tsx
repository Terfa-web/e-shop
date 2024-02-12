"use client";

import { formatPrice } from "@/utility/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetials";
import Link from "next/link";
import { truncateText } from "@/utility/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";

interface CartContentProps {
  product: CartProductType;
}

const CartContent = ({ product }: CartContentProps) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              fill
              className="object-contain"
              src={product.selectedImg.image}
              alt={product.name}
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${product.id}`}>
            {truncateText(product.name)}
          </Link>
          <div>{product.selectedImg.color}</div>
          <div className="w-[70px]">
            <button className="text-slate-500 underline" onClick={() => {}}>
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(product.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={product}
          handleQuantityDecrease={() => {}}
          handleQuantityIncrease={() => {}}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(product.price * product.quantity)}
      </div>
    </div>
  );
};

export default CartContent;
