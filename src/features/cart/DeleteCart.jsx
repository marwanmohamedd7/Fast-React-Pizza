import { useDispatch } from "react-redux";
import { removeItemFromCart } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteCart({ id }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(removeItemFromCart(id))} type="small">
      remove
    </Button>
  );
}

export default DeleteCart;
