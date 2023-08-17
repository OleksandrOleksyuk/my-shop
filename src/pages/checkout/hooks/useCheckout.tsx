import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "@/model/order-form";
import { selectCartList, selectTotalCartCost, useCart } from "@/services/cart";

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useCheckout() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [dirty, setDirty] = useState(false);

  const totalCartCost = useCart(selectTotalCartCost);
  const clearCart = useCart((state) => state.clearCart);
  const order = useCart(selectCartList);

  function changeHandler(e: ChangeEvent<HTMLInputElement>): void {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUser((state) => ({ ...state, [name]: value }));
    setDirty(true);
  }

  function sendOrder(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    const orderInfo: OrderForm = {
      user,
      order,
      status: "pending",
      total: totalCartCost,
    };
    console.log(orderInfo);
    clearCart();
    navigate("/thankyou");
  }

  const isNameValid = user.name.length;
  const isEmailValid = user.email.match(EMAIL_REGEX);
  const isValid = isNameValid && isEmailValid;
  return {
    validators: { isEmailValid, isNameValid, isValid },
    actions: { changeHandler, sendOrder },
    dirty,
    user,
    totalCartCost,
  };
}
