import { Link } from "react-router-dom";
import ProductsContainer from "./ProductsContainer";
const ProductsSection = ({ heading, linkText, link, products, state }) => {
  return (
    <>
      <span className="products-section">
        <h2>{heading}</h2>
        <Link to={link} state={state && state}>
          {linkText}
        </Link>
      </span>
      <ProductsContainer products={products} />
    </>
  );
};

export default ProductsSection;
