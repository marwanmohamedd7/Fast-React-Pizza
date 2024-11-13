import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utilites/helpers";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { useState } from "react";
import EmptyCart from "../cart/EmptyCart";
import Button from "../../ui/Button";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const navigation = useNavigation();
  const {
    userName,
    status: addressStatus,
    address,
    position,
    error,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const isSubmitting = navigation.state === "submitting";

  // get whatever returned from action function incase there was no submission
  const formErrors = useActionData();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">First Name:</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">Phone number:</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">Address:</label>
          <div className=" grow">
            <input
              disabled={isLoadingAddress}
              type="text"
              name="address"
              defaultValue={address}
              required
              className="input w-full"
            />

            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="top- absolute right-[3px] top-[34px] z-50 sm:right-[3px] sm:top-[2.8px] md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="small"
              >
                get location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-6">
          <input
            className="h-5 w-5 accent-yellow-400 focus:outline-none
           focus:ring focus:ring-yellow-300 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `lat:${position.latitude}, long:${position.longitude}`
                : ``
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? `Placing order...`
              : `Order now for ${formatCurrency(totalCartPrice + priority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = `Please give us your correct phone number.
   We might need it to contact you.`; // For example +380971234567.

  if (Object.keys(errors).length) return errors;

  // If everything is okay, create new order and redirect
  const orderAction = await createOrder(order);

  // Clear Cart after submitting the order
  // Do Not overuse this technique
  store.dispatch(clearCart());

  return redirect(`/order/${orderAction.id}`);
}

export default CreateOrder;
