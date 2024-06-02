import { Link } from "react-router-dom";
import demoShoeData from "../../../../../demo-arrays/demoShoeData";
const PendingProduct = ({ orderId, productId, dateDelivered }) => {
  const product = demoShoeData.find((item) => item.id === productId);
  return (
    <article className="pending-product">
      <div>
        <div className="image">
          <img
            src={product && product.image}
            alt={product && product.shoename}
          />
        </div>
        <span>
          <h2>{product && product.shoename}</h2>
          <p className="order">Order #: {orderId}</p>
          <p className="delivered">Delivered on {dateDelivered}</p>
        </span>
      </div>
      <Link
        to={`/profile/reviews/${productId}`}
        state={{ cLink: "/profile/reviews", id: orderId }}
      >
        RATE THIS PRODUCT
      </Link>
    </article>
  );
};
export default PendingProduct;
