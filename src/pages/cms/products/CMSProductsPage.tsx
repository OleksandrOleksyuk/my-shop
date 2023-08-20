import { useEffect } from "react";
import { useProductsService } from "@/services/products";
import { ServerError, Spinner } from "@/shared/";
import CMSProductsList from "./components/CMSProductsList";
import CMSProductForm from "./components/CMSProductForm";

export function CMSProductsPage() {
  const { state, actions } = useProductsService();

  useEffect(() => {
    actions.getProduct();
  }, []);

  return (
    <div>
      <h1 className="title">CMS</h1>
      Pagina Prodotti
      <hr className="my-8" />
      {state.pending && <Spinner />}
      {state.error && <ServerError message={state.error} />}
      <CMSProductForm
        activeItem={state.activeItem}
        onClose={actions.resetActiveItem}
        onAdd={actions.addProduct}
        onEdit={actions.editProduct}
      />
      <CMSProductsList
        items={state.products}
        activeItem={state.activeItem}
        onEditItem={actions.setActiveItem}
        onDeleteItem={actions.deleteProduct}
      />
      <button className="btn primary" onClick={() => actions.setActiveItem({})}>
        ADD NEW
      </button>
    </div>
  );
}
