import { useContext, useEffect } from "react";
import Quantity from "./Quantity";
import { ProductPageContext } from "../ProductPage";
import Price from "../../../components/Price";
import { AppContext } from "../../../App";

const FixedQuantity = ({ fixedQuantityOpen }) => {
  const { setpushScrollTop } = useContext(AppContext);
  const { product } = useContext(ProductPageContext);
  const { image, shoename, price, sale } = product;
  useEffect(() => {
    if (fixedQuantityOpen) {
      setpushScrollTop(true);
    } else {
      setpushScrollTop(false);
    }
  }, [fixedQuantityOpen, setpushScrollTop]);
  return (
    <div
      className="fixed-quantity"
      style={{ transform: fixedQuantityOpen && "translateY(0)" }}
    >
      <span className="image-name">
        <div className="image">
          <img src={image} alt={shoename} />
        </div>
        <h4>{shoename}</h4>
      </span>
      <span className="price-quantity">
        <div className="price-cont">
          <Price price={price} sale={sale} />
        </div>
        <Quantity />
      </span>
    </div>
  );
};
export default FixedQuantity;
