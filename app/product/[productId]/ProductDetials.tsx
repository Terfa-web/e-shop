"use client";

import { Rating } from "@mui/material";
import React, { useState } from "react";

interface ProductDetialsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const Horizontal = () => {
  return <hr className="w-[30%] my-2 " />;
};
const ProductDetials = ({ product }: ProductDetialsProps) => {
  const { id, name, description, category, brand, price } = product;

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id,
    name,
    description,
    category,
    brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price,
  });

  const productsRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
      <div>images</div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productsRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />

        <div>
          <span className="font-semibold mr-1">CATEGORY:</span>
          <span>{product.category}</span>
        </div>
        <div>
          <span className="font-semibold mr-1">BRAND:</span>
          <span>{product.brand}</span>
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        <div>Color</div>
        <Horizontal />
        <div>Quantity</div>
        <Horizontal />
        <div>add to cart</div>
      </div>
    </div>
  );
};

export default ProductDetials;
