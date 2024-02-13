import Container from "@/app/components/Container";

import React from "react";
import ProductDetials from "./ProductDetials";
import ListRating from "./ListRating";
import { products } from "@/utility/products";

interface Params {
  productId?: string;
}
const Product = ({ params }: { params: Params }) => {
  console.log("params", params);

  const product = products.find((product) => product.id === params.productId);

  return (
    <div className="p-8">
      <Container>
        <ProductDetials product={product} />

        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
