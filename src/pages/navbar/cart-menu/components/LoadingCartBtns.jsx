import { Link } from "react-router-dom";
import { AppContext } from "../../../../App";
import { useContext } from "react";

const LoadedCartBtns = ({ totalPrice, isLoggedIn }) => {
  const { setCartOpen } = useContext(AppContext);
  return (
    <div className="loaded-cart">
      <span>
        <p>Subtotal:</p>
        <p className="price">${totalPrice}</p>
      </span>
      <Link
        to={"/cart"}
        onClick={() => {
          setCartOpen(false);
        }}
      >
        VIEW CART
      </Link>
      <Link
        to={isLoggedIn ? "/checkout" : "/login"}
        state={"/checkout"}
        onClick={() => {
          setCartOpen(false);
        }}
      >
        CHECKOUT
      </Link>
    </div>
  );
};
export default LoadedCartBtns;
