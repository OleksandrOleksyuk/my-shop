import { CartItem } from "@/model/cart-item";
import { Product } from "@/model/product";
import { create } from "zustand";

export interface CartState {
  list: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
  foundItems: (productId: string) => CartItem | undefined;
  updateList: (found: CartItem) => void;
}

export const useCart = create<CartState>((set, get) => ({
  list: [],
  addToCart: (product: Product) => {
    const found = get().foundItems(product.id);
    if (found) {
      // increase qty
      get().increaseQty(product.id);
    } else {
      // add product to cart
      const item: CartItem = { product, qty: 1 };
      set((state) => ({ list: [...state.list, item] }));
    }
  },
  increaseQty: (productId: string) => {
    const found = get().foundItems(productId);
    if (!found) return;
    found.qty++;
    get().updateList(found);
  },
  decreaseQty: (productId: string) => {
    const found = get().foundItems(productId);
    if (found?.qty === 1) get().removeFromCart(productId);
    if (found && found.qty > 0) {
      found.qty--;
      get().updateList(found);
    }
  },
  clearCart: () => {
    set({ list: [] });
  },
  foundItems: (productId: string) => {
    return get().list.find((item) => item.product.id === productId);
  },
  updateList: (found) => {
    set((state) => ({
      list: state.list.map((item) => {
        return item.product.id === found.product.id ? found : item;
      }),
    }));
  },
  removeFromCart: (productId: string) => {
    set((state) => ({
      list: state.list.filter((item) => item.product.id !== productId),
    }));
  },
}));
