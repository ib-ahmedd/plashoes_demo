import { useNavigate, useParams } from "react-router-dom";
import DeliveryInfo from "./components/DeliveryInfo";
import ItemsInOrder from "./components/ItemInOrder";
import OrderId from "./components/OrderId";
import PaymentInfo from "./components/PaymentInfo";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import LoadingItems from "./components/LoadingItems";
import demoShoeData from "../../../../demo-arrays/demoShoeData";

const OrderDetails = () => {
  const {
    user,
    setCartRefresh,
    getCookie,
    setCookie,
    cartProducts,
    setProducts,
  } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);

  const getOrderDetails = useCallback(() => {
    setLoading(true);
    const userOrderCookie = getCookie(`user${user.id}orders`);
    const userOrders = userOrderCookie
      ? JSON.parse(userOrderCookie)
      : undefined;
    const orderDetail = userOrders
      ? userOrders.find((item) => item.orderId === parseInt(id))
      : {};
    setOrderDetails(orderDetail);
    setLoading(false);
  }, [id, user.id, getCookie]);

  function buyAgain() {
    setBuyLoading(true);
    const product = demoShoeData.find(
      (item) => item.id === orderDetails.productId
    );
    const cartItem = {
      image: product.image,
      shoename: product.shoename,
      quantity: 1,
      price: product.price,
      productId: product.id,
    };
    const foundProduct = cartProducts.find(
      (item) => item.id === orderDetails.productId
    );
    if (foundProduct) {
      setProducts((prevState) => {
        const updatedItems = prevState.map((item) => {
          if (item.id === orderDetails.productId) {
            item.quantity = item.quantity + 1;
          }
          return item;
        });
        setCookie(`user${user.id}`, JSON.stringify(updatedItems), 1);
        return updatedItems;
      });
    } else {
      const cartItemId =
        cartProducts.length > 0
          ? cartProducts[cartProducts.length - 1].cartItemId + 1
          : 1;
      setCookie(
        `user${user.id}`,
        JSON.stringify([...cartProducts, { ...cartItem, cartItemId }]),
        1
      );
      setCartRefresh(true);
    }
    setCartRefresh(true);
    navigate("/cart", { state: cartItem.shoename });
  }

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);
  return (
    <section className="order-details">
      <OrderId orderDetails={orderDetails} />
      <h2>ITEMS IN YOUR ORDER</h2>
      {!loading ? (
        <ItemsInOrder
          orderDetails={orderDetails}
          buyAgain={buyAgain}
          buyLoading={buyLoading}
        />
      ) : (
        <LoadingItems />
      )}
      <div className="payment-delivery">
        <PaymentInfo orderDetails={orderDetails} />
        <DeliveryInfo orderDetails={orderDetails} />
      </div>
    </section>
  );
};
export default OrderDetails;
