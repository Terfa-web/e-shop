"use client";

import { formatPrice } from "@/utillity/formatPrice";
import { truncateText } from "@/utillity/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productsRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  return (
    <div
      className="col-span-1 cursor-
     border-[1.2px]
     border-slate-200
     bg-slate-50
     rounded-sm
     p-2
     transition
     hover:scale-105
     text-center
     text-sm
     "
    >
      <div
        className="
        flex
        flex-col
        items-center
        w-full 
        gap-1
      "
      >
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={product.images[0].image}
            className="w-full h-full object-contain"
            alt={product.name}
          />
        </div>
        <div className="mt-4">{truncateText(product.name)}</div>
        <div>
          {" "}
          <Rating value={productsRating} readOnly />{" "}
        </div>
        <div>{product.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(product.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
