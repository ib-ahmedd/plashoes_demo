import { useNavigate } from "react-router-dom";
import demoShoeData from "../../../../../demo-arrays/demoShoeData";

const ItemsInOrder = ({ orderDetails, buyLoading, buyAgain }) => {
  const { orderStatus, dateOrdered, quantity, shoename, productId } =
    orderDetails;
  const navigate = useNavigate();
  const product = demoShoeData.find((item) => item.id === productId);
  return (
    <article className="items-in-order">
      <div className="left">
        <p
          className="status"
          style={{ backgroundColor: orderStatus === "Delivered" && "green" }}
        >
          {orderStatus}
        </p>
        <p className="date">On {dateOrdered}</p>
        <span className="outer-span">
          <div className="image">
            <div className="image">
              <img src={product && product.image} alt={shoename} />
            </div>
          </div>
          <span className="inner-span">
            <h3>{shoename}</h3>
            <p className="qty">QTY: {quantity}</p>
            <p className="price">
              Price: ${product && product.price.toFixed(2)}
            </p>
          </span>
        </span>
      </div>
      <div className="right">
        {!buyLoading ? (
          <button
            className="buy"
            onClick={() => {
              buyAgain(productId, shoename);
            }}
          >
            BUY AGAIN
          </button>
        ) : (
          <button
            className="buy"
            style={{ backgroundColor: "var(--grey)" }}
            disabled
          >
            BUY AGAIN
          </button>
        )}
        <button
          className="view"
          onClick={() => {
            navigate(`/product/${productId}`);
          }}
        >
          VIEW PRODUCT
        </button>
      </div>
    </article>
  );
};
export default ItemsInOrder;
