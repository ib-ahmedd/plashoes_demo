import OrderInfo from "./OrderInfo";
const InitOrders = ({ orders }) => {
  const ordersDisplay = orders.map((item) => {
    return (
      <OrderInfo
        key={item.orderId}
        {...item}
        link={`/product/${item.productId}`}
      />
    );
  });
  return <div className="init-orders">{ordersDisplay}</div>;
};
export default InitOrders;
