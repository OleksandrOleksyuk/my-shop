import { useReducer } from "react";
import { OrderForm, OrderStatus } from "@/model/order-form";
import { initialState, ordersReducer } from "@/services/orders/orders.reducer";
import * as OrdersApi from "./orders.api";

export function useOrdersService() {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  async function getOrders() {
    dispatch({ type: "pending", payload: true });
    try {
      const res = await OrdersApi.get();
      dispatch({ type: "ordersGetSuccess", payload: res.items });
    } catch (e) {
      dispatch({ type: "error", payload: "Orders not loaded" });
    }
  }

  async function deleteOrder(id: string) {
    dispatch({ type: "pending", payload: true });
    try {
      await OrdersApi.remove(id);
      dispatch({ type: "orderDeleteSuccess", payload: id });
    } catch (e) {
      dispatch({ type: "error", payload: "Order not deleted" });
    }
  }

  async function addOrder(order: OrderForm) {
    dispatch({ type: "pending", payload: true });
    try {
      return await OrdersApi.add(order);
    } catch (e) {
      dispatch({ type: "error", payload: "Order not added" });
      return e;
    }
  }

  async function toggleOrderStatus(id: string, status: OrderStatus) {
    dispatch({ type: "pending", payload: true });
    try {
      const res = await OrdersApi.toggleStatus(id, status);
      dispatch({ type: "orderToggleStatusSuccess", payload: res });
    } catch (e) {
      dispatch({ type: "error", payload: "Order not deleted" });
    }
  }

  return {
    actions: { getOrders, deleteOrder, addOrder, toggleOrderStatus },
    state,
  };
}
