import { formatCurrency } from "../../utilites/helpers";
import UpdateCartItem from "./UpdateCartItem";
import DeleteCart from "./DeleteCart";
import { getCurrentQuantityById } from "./cartSlice";
import { useSelector } from "react-redux";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-end justify-between sm:items-center sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center justify-center gap-4">
          <UpdateCartItem id={pizzaId} currentQuantity={currentQuantity} />
          <DeleteCart id={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
