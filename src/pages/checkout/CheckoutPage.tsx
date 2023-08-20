import clsx from "clsx";
import { useCheckout } from "./hooks/useCheckout";
import { ServerError } from "@/shared/";

export function CheckoutPage() {
  const { validators, actions, dirty, user, totalCartCost, error } =
    useCheckout();
  const { isEmailValid, isNameValid, isValid } = validators;
  const { changeHandler, sendOrder } = actions;

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="title">CHECKOUT</h1>

      {error && <ServerError message={error} />}

      <div className="text-xl my-3 border-b">€ {totalCartCost}</div>

      <form className="flex flex-col gap-3" onSubmit={sendOrder}>
        Your name:
        <input
          type="text"
          placeholder="your name"
          name="name"
          value={user.name}
          onChange={changeHandler}
          className={clsx({ error: !isNameValid && dirty })}
        />
        Your email
        <input
          type="email"
          placeholder="Your email"
          name="email"
          value={user.email}
          onChange={changeHandler}
          className={clsx({ error: !isEmailValid && dirty })}
        />
        <button
          type="submit"
          className={clsx("btn", { primary: !isValid, success: isValid })}
          disabled={!isValid}
        >
          CONFIRM ORDER
        </button>
      </form>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
