import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">make a priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  /*
   The `request` object contains the HTTP request information
   and can be used to extract URL parameters.
  */

  /*
  // This is where you would normally check if a user is authenticated
  // If not, you redirect them to sign in with:
  // response.redirect("/signin")
  */

  // Get the order ID from the URL parameter sent by React Router (URL)
  const updatedData = { priority: true };
  await updateOrder(params.orderId, updatedData);
  return null;
}
