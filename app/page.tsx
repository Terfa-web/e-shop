import { products } from "@/utility/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 cursor-pointer">
          {products.map((product: any, index) => {
            return <ProductCard product={product} key={index} />;
          })}
        </div>
      </Container>
    </div>
  );
}
