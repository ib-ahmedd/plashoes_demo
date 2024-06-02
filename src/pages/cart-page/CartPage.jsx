import CartUpdate from "./components/CartUpdate";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

import "../../assets/styles/cart-page/cart-style.css";
import "../../assets/styles/cart-page/cart-tab-style.css";
import "../../assets/styles/cart-page/cart-mobile-style.css";
import "../../assets/styles/cart-page/cart-tab-style.css";
import "../../assets/styles/cart-page/cart-laptop-style.css";
import TableTotal from "./components/TableTotal";
import CartEmpty from "./components/CartEmpty";
import { useLocation } from "react-router-dom";
import CartAdd from "./components/CartAdd";

export const CartPageContext = createContext("");

const CartPage = () => {
  const {
    user,
    cartEmpty,
    setCartRefresh,
    isLoggedIn,
    setCookie,
    cartProducts,
  } = useContext(AppContext);
  const { state } = useLocation();
  const { id } = user;
  const [cartUpdated, setCartUpdate] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  useEffect(() => {
    if (state && !cartEmpty) {
      setCartAdded(true);
    }
  }, [state, cartEmpty]);

  const handleQuantity = async (func, id) => {
    setCartAdded(false);
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
      setCookie(`user${user.id}`, JSON.stringify(updatedItems), 7);
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
  };

  const handleDelete = async (id) => {
    setCartAdded(false);
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
    setCartUpdate(true);
    setCartRefresh(true);
  };

  const cartContextValue = {
    id,
    handleDelete,
    cartUpdated,
    setCartUpdate,
    handleQuantity,
  };

  return (
    <main className="cart-page">
      <CartPageContext.Provider value={cartContextValue}>
        <section className="cart-page-body">
          <h1>Cart</h1>
          {cartUpdated && !cartEmpty && <CartUpdate />}
          {cartAdded && <CartAdd shoe_name={state} />}
          {cartEmpty ? <CartEmpty /> : <TableTotal />}
        </section>
      </CartPageContext.Provider>
    </main>
  );
};
export default CartPage;
