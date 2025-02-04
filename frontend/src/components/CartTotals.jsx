import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartTotals = () => {
  const { calculateSubtotal, calculateTotal } = useContext(CartContext);

  return (
    <>
      <div className="flex flex-col gap-2 mt-2 text-sm max-sm:text-xs">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs {calculateSubtotal()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>Rs 180.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>Rs {calculateTotal()}.00</b>
        </div>
      </div>
    </>
  );
};

export default CartTotals;
