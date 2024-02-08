import Container from "@/app/components/Container";
import { product } from "@/utility/product";
import React from "react";
import ProductDetials from "./ProductDetials";

interface Params {
  productId?: string;
}
const Product = ({ params }: { params: Params }) => {
  console.log("params", params);
  product;
  return (
    <div className="p-8">
      <Container>
        <ProductDetials product={product} />
      </Container>
    </div>
  );
};

export default Product;
