import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utilites/helpers";
import { addItemToCart, getCurrentQuantityById } from "../cart/cartSlice";
import Button from "../../ui/Button";
import DeleteCart from "../cart/DeleteCart";
import UpdateCartItem from "../cart/UpdateCartItem";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItemToCart(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && `opacity-70 grayscale`}`}
      />
      <div className="flex flex-grow flex-col justify-between">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm capitalize italic text-stone-500">
            {ingredients.join(", ")}
          </p>
        </div>
        <div className="flex items-end justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-4">
              <UpdateCartItem id={id} currentQuantity={currentQuantity} />
              <DeleteCart id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button
              onClick={handleAddToCart}
              disabled={soldOut ? true : false}
              type="small"
            >
              add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
