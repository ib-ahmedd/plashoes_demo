import ProductsSection from "../../../components/ProductsSection";
import demoShoeData from "../../../demo-arrays/demoShoeData";

const SaleProducts = () => {
  const products = demoShoeData.filter((item) => item.sale);
  return (
    <section className="sale-products">
      <ProductsSection
        heading={"Last Pairs"}
        link={"/sale-shop"}
        linkText={"VIEW ALL"}
        products={products}
      />
    </section>
  );
};
export default SaleProducts;
