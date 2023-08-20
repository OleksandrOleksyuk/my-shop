import { useEffect } from "react";
import { ServerError, Spinner } from "@/shared/";
import { ProductCard } from "./components/ProductCard";
import { useCart, useCartPanel } from "@/services/cart";
import { useProductsService } from "@/services/products";

export function ShopPage() {
  const openCartPanel = useCartPanel((state) => state.openOverlay);
  const addToCart = useCart((state) => state.addToCart);

  const { state, actions } = useProductsService();

  useEffect(() => {
    actions.getProduct();
  }, []);

  return (
    <div>
      <h1 className="title">SHOP</h1>

      {state.pending && <Spinner />}
      {state.error && <ServerError />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {state.products.map((product) => {
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
