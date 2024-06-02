import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import SaleModal from "./SaleModal";
import Price from "./Price";
const ProductModal = ({ id, shoename, image, price, sale, rating }) => {
  return (
    <div className="product-modal">
      {sale && <SaleModal />}
      <Link to={`/product/${id}`}>
        <div className="image">
          <img src={image} alt={shoename} />
        </div>
      </Link>
      <span>
        <Link to={`/product/${id}`} className="name">
          {shoename}
        </Link>
        <Price price={price} sale={sale} />
        <RatingStars stars={rating} />
      </span>
    </div>
  );
};

export default ProductModal;
