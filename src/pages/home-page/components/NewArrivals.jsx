import ProductsSection from "../../../components/ProductsSection";
import demoShoeData from "../../../demo-arrays/demoShoeData";
import sortOptionsArrays from "../../../demo-arrays/sortOptionsArrays";
const NewArrivals = () => {
  const products = [];
  sortOptionsArrays.latest.forEach((number) => {
    const foundProduct = demoShoeData.find((item) => item.id === number);
    if (foundProduct && sortOptionsArrays.latest.indexOf(number) < 6)
      return products.push(foundProduct);
  });

  return (
    <section className="new-arrivals">
      <ProductsSection
        heading={"New Arrivals"}
        linkText={"VIEW ALL NEW ARRIVALS"}
        products={products}
        link={"/collection"}
        state={"latest"}
      />
    </section>
  );
};
export default NewArrivals;
