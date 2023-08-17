import { Product } from "@/model/product";
import { ServerError } from "@/shared/";
import { Spinner } from "@/shared/";
import { useEffect, useState } from "react";
import { pb } from "../../pocketbase";
import { ProductCard } from "./components/ProductCard";
import { useCart, useCartPanel } from "@/services/cart";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const openCartPanel = useCartPanel((state) => state.openOverlay);
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    setisLoading(true);
    pb.collection("products")
      .getList<Product>()
      .then((res) => {
        setProducts(res.items);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setisLoading(false));
  }, []);

  // function addToCart(product: Partial<Product>) {
  //   console.log(product);
  //   openCartPanel();
  //   addToCart(product);
  // }

  return (
    <div>
      <h1 className="title">SHOP</h1>

      {isLoading && <Spinner />}
      {isError && <ServerError />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={() => {
                  openCartPanel();
                  addToCart(product);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
