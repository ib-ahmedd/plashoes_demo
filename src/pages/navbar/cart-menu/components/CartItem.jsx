import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import SetQuantity from "../../../../components/SetQuantity";
import { Link } from "react-router-dom";

const CartItem = ({
  image,
  shoename,
  quantity,
  price,
  cartItemId,
  productId,
  handleDelete,
  handleQuantity,
}) => {
  const totalItemPrice = quantity * price;
  return (
    <article className="cart-item">
      <div className="cart-item-left">
        <div className="image">
          <img src={image} alt={shoename} />
        </div>
        <span>
          <Link to={`/product/${productId}`}>{shoename}</Link>
          <SetQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            id={cartItemId}
          />
        </span>
      </div>
      <div className="cart-item-right">
        <button
          onClick={() => {
            handleDelete(cartItemId);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <p>${totalItemPrice.toFixed(2)}</p>
      </div>
    </article>
  );
};
export default CartItem;
