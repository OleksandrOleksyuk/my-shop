import { Product } from "@/model/product";
import { pb } from "@/pocketbase";
import { useEffect, useState } from "react";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    handleLoadData();
  }, []);

  function handleLoadData() {
    pb.collection("products")
      .getList<Product>()
      .then((res) => {
        setProducts(res.items);
      });
  }
  return (
    <div>
      <h1 className="title">SHOP</h1>

      <button className="btn" onClick={handleLoadData}>
        Load data
      </button>

      <ul>
        {products?.map((product) => {
          return <li key={product.id}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
}
