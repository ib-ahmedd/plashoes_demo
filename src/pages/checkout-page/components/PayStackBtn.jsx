import { useContext } from "react";
import { PaystackButton } from "react-paystack";
import { AppContext } from "../../../App";

const PayStackBtn = ({ setPaymentSuccess }) => {
  const {
    user,
    cartProducts,
    setCartRefresh,
    setPayedOrders,
    deleteCookie,
    setCookie,
    getCookie,
    getDate,
  } = useContext(AppContext);
  let totalAmount = 0;
  cartProducts.forEach(
    (item) =>
      (totalAmount = totalAmount + parseFloat(item.price) * item.quantity)
  );
  const amountInNaira = totalAmount * 500;
  const amountInKobo = (amountInNaira * 100).toFixed(2);

  const publicKey = "pk_test_598a86084da5e02b6fe8ba4d9921241db331c813";
  const amount = amountInKobo;
  const componentProps = {
    email: user.email,
    amount,
    metadata: {
      name: user.user_name,
      phone: 0 + user.mobile_no,
    },
    publicKey,
    text: "PROCEED TO PAYMENT",
    onSuccess: () => handlePaySuccess(),
    onClose: () => console.log("Wait! Don't leave :("),
  };

  async function handlePaySuccess() {
    setPaymentSuccess(true);
    cartProducts.forEach((item) => {
      const userOrdersCookie = getCookie(`user${user.id}orders`);
      const userOrders = userOrdersCookie && JSON.parse(userOrdersCookie);
      let lastOrderId = userOrdersCookie
        ? userOrders[userOrders.length - 1].orderId
        : 0;
      const orderDetails = {
        orderId: lastOrderId + 1,
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: (parseFloat(item.price) * item.quantity).toFixed(2),
        dateOrdered: getDate(),
        reviewed: false,
        orderStatus: lastOrderId % 2 === 0 ? "Processing" : "Delivered",
        dateDelivered: lastOrderId % 2 === 0 ? null : getDate(),
      };

      if (userOrdersCookie) {
        setCookie(
          `user${user.id}orders`,
          JSON.stringify([...userOrders, orderDetails]),
          1
        );
      } else {
        setCookie(`user${user.id}orders`, JSON.stringify([orderDetails]), 1);
      }
    });

    deleteCookie(`user${user.id}`);
    setPayedOrders(cartProducts);
    setCartRefresh(true);
  }
  return <PaystackButton {...componentProps} />;
};
export default PayStackBtn;
