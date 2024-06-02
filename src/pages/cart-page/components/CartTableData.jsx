import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SetQuantity from "../../../components/SetQuantity";
import { Link } from "react-router-dom";

const CartTableData = ({
  image,
  shoename,
  quantity,
  price,
  handleQuantity,
  productId,
  cartItemId,
  handleDelete,
}) => {
  return (
    <tr>
      <td className="image-width table-image">
        <div className="image">
          <img src={image} alt={shoename} />
        </div>
      </td>
      <td className="product-width product">
        <Link to={`/product/${productId}`}>{shoename}</Link>
      </td>
      <td className="price-width">${price.toFixed(2)}</td>
      <td className="quantity-width">
        <SetQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          id={cartItemId}
        />
      </td>
      <td className="subtotal-width subtotal">
        <span>
          ${(price * quantity).toFixed(2)}
          <button
            onClick={() => {
              handleDelete(cartItemId);
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} className="xmark" />
          </button>
        </span>
      </td>
    </tr>
  );
};
export default CartTableData;
