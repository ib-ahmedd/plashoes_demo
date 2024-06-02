import ProductsSection from "../../../components/ProductsSection";
import demoShoeData from "../../../demo-arrays/demoShoeData";
import sortOptionsArrays from "../../../demo-arrays/sortOptionsArrays";

const BestSellers = () => {
  const products = [];
  sortOptionsArrays.popularity.forEach((number) => {
    const foundProduct = demoShoeData.find((item) => item.id === number);
    if (foundProduct && sortOptionsArrays.popularity.indexOf(number) < 6)
      return products.push(foundProduct);
  });

  return (
    <section className="best-sellers">
      <ProductsSection
        heading={"Our Best Seller"}
        linkText={"VIEW ALL BEST SELLERS"}
        link={"/collection"}
        state={"popularity"}
        products={products}
      />
    </section>
  );
};

export default BestSellers;
