import ProductModal from "./ProductModal";
const ProductsContainer = ({ products }) => {
  let displayedProducts = [];
  displayedProducts = products.map((item) => (
    <ProductModal key={item.id} {...item} />
  ));

  return <div className="products-container">{displayedProducts}</div>;
};
export default ProductsContainer;
