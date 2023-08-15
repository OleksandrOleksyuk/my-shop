import { Product } from "@/model/product";
import { ServerError } from "@/shared/";
import { Spinner } from "@/shared/";
import { useEffect, useState } from "react";
import { pb } from "../../pocketbase";
import { ProductCard } from "./components/ProductCard";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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

  function addToCart(p: Partial<Product>) {
    console.log(p);
  }

  return (
    <div>
      <h1 className="title">SHOP</h1>

      {isLoading && <Spinner />}
      {isError && <ServerError />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {products.map((p) => {
          return (
            <div key={p.id}>
              <ProductCard product={p} onAddToCart={addToCart} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
