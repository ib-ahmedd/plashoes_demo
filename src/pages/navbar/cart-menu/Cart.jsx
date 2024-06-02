import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CartContent from "./components/CartContent";
import LoadedCartBtns from "./components/LoadingCartBtns";
import ScreenCover from "../../../components/ScreenCover";
import { createContext, useContext } from "react";
import { AppContext } from "../../../App";

export const CartIconContext = createContext("");

const Cart = ({ toggleCart }) => {
  const {
    user,
    setCartRefresh,
    cartProducts,
    cartOpen,
    isLoggedIn,
    setCookie,
  } = useContext(AppContext);

  const cartContent = cartProducts && cartProducts.length;
  let totalPrice = 0;
  if (cartProducts && cartProducts.length !== 0) {
    cartProducts.forEach((item) => {
      totalPrice = totalPrice + parseFloat(item.price) * item.quantity;
    });
  }

  function handleDelete(id) {
    if (isLoggedIn) {
      const updatedItems = cartProducts.filter(
        (item) => item.cartItemId !== id
      );
      setCookie(`user${user.id}`, JSON.stringify(updatedItems), 1);
      setCartRefresh(true);
    } else {
      const updatedItems = cartProducts.filter(
        (item) => item.cartItemId !== id
      );
      setCookie("noLogCart", JSON.stringify(updatedItems), 1);
      setCartRefresh(true);
    }
    setCartRefresh(true);
  }
  function handleQuantity(func, id) {
    if (isLoggedIn) {
      const updatedItems = cartProducts.map((item) => {
        if (item.cartItemId === id) {
          if (func === "add") {
            item.quantity = item.quantity + 1;
          } else {
            if (item.quantity > 1) {
              item.quantity = item.quantity - 1;
            }
          }
        }
        return item;
      });
      setCookie(`user${user.id}`, JSON.stringify(updatedItems), 1);
    } else {
      const updatedItems = cartProducts.map((item) => {
        if (item.cartItemId === id) {
          if (func === "add") {
            item.quantity = item.quantity + 1;
          } else {
            if (item.quantity > 1) {
              item.quantity = item.quantity - 1;
            }
          }
        }
        return item;
      });
      setCookie("noLogCart", JSON.stringify(updatedItems), 7);
    }
    setCartRefresh(true);
  }

  const cartIconContextValue = {
    handleQuantity,
    handleDelete,
  };

  return (
    <>
      <section
        className="cart"
        style={{ transform: cartOpen && "translateX(0)" }}
      >
        <CartIconContext.Provider value={cartIconContextValue}>
          <div className="cart-title-content">
            <span className="cart-title-close">
              <h3>Shopping cart</h3>
              <button onClick={toggleCart}>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </span>
            {cartContent ? (
              <CartContent />
            ) : (
              <p className="cart-empty">No products in cart</p>
            )}
          </div>
          {cartContent ? (
            <LoadedCartBtns
              totalPrice={totalPrice.toFixed(2)}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <Link to={"/collection"} className="cont-shop">
              CONTINUE SHOPPING
            </Link>
          )}
        </CartIconContext.Provider>
      </section>
      {cartOpen && <ScreenCover toggleMenu={toggleCart} />}
    </>
  );
};
export default Cart;
