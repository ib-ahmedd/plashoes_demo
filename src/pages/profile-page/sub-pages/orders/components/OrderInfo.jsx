import { Link } from "react-router-dom";
import demoShoeData from "../../../../../demo-arrays/demoShoeData";
const OrderInfo = ({
  orderId,
  productId,
  totalPrice,
  quantity,
  dateOrdered,
  orderStatus,
}) => {
  const product = demoShoeData.find((item) => item.id === productId);
  return (
    <article className="order-info">
      <span className="orders-image-details">
        <div className="image">
          <img
            src={product && product.image}
            alt={product && product.shoename}
          />
        </div>
        <span className="orders-details">
          <h2>{product && product.shoename}</h2>
          <p className="order-price">Price: ${totalPrice}</p>
          <p>Quantity: {quantity}</p>
          <p>Status: {orderStatus}</p>
          <p className="order-date">On {dateOrdered}</p>
        </span>
      </span>
      <span className="buttons-span">
        <Link to={`/product/${productId}`} className="product">
          SEE PRODUCT
        </Link>
        <Link
          to={`/profile/orders/${orderId}`}
          state={{ cLink: "/profile/orders" }}
          className="order-details"
        >
          ORDER DETAILS
        </Link>
      </span>
    </article>
  );
};
export default OrderInfo;
