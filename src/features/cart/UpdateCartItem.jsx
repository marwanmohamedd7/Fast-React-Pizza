import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantityByOne, increaseQuantityByOne } from "./cartSlice";

function UpdateCartItem({ id, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button onClick={() => dispatch(decreaseQuantityByOne(id))} type="round">
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button onClick={() => dispatch(increaseQuantityByOne(id))} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateCartItem;
