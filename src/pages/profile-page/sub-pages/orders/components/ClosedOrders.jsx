import OrderInfo from "./OrderInfo";

const ClosedOrders = ({ orders }) => {
  const ordersDisplay = orders.map((item) => (
    <OrderInfo
      key={item.orderId}
      {...item}
      link={`/product/${item.productId}`}
    />
  ));
  return <div className="closed-orders">{ordersDisplay}</div>;
};
export default ClosedOrders;
