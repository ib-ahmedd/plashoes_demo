import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SetQuantity from "../../../components/SetQuantity";
import { Link } from "react-router-dom";

const CartTableMobile = ({
  cartItemId,
  shoename,
  image,
  price,
  quantity,
  productId,
  handleQuantity,
  handleDelete,
}) => {
  const subtotal = (price * quantity).toFixed(2);
  return (
    <article className="cart-table-mobile">
      <div>
        <span>
          <div className="image">
            <img src={image} alt={shoename} />
          </div>
          <Link to={`/product/${productId}`}>{shoename}</Link>
        </span>
        <button
          onClick={() => {
            handleDelete(cartItemId);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} className="xmark" />
        </button>
      </div>
      <div>
        <h4>Price: </h4>
        <p>${price.toFixed(2)}</p>
      </div>
      <div>
        <h4>Quantity:</h4>
        <SetQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          id={cartItemId}
        />
      </div>
      <div>
        <h4>Subtotal:</h4> <p>${subtotal}</p>
      </div>
    </article>
  );
};
export default CartTableMobile;
