const OrderId = ({ orderDetails }) => {
  const { orderId, quantity, dateOrdered, totalPrice } = orderDetails;
  return (
    <article className="order-id">
      <h2 style={{ fontWeight: "bold" }}>Order #{orderId}</h2>
      <p>{quantity} Items</p>
      <p>Placed on {dateOrdered}</p>
      <p>Total ${totalPrice}</p>
    </article>
  );
};
export default OrderId;
