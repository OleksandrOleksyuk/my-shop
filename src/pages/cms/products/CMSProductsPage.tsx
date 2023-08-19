import { useProductsService } from "@/services/products";

export function CMSProductsPage() {
  const { state, actions } = useProductsService();

  function getProductsHandler() {
    actions.getProduct();
  }
  return (
    <div>
      <h1 className="title">CMS</h1>
      Pagina Prodotti
      <hr className="my-8" />
      {state.pending && <div>loading...</div>}
      {state.error && <div>{state.error}</div>}
      <button className="btn primary" onClick={getProductsHandler}>
        GET
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
