import { useContext, useState } from "react";
import LongDesc from "./LongDesc";
import ProductReviews from "./ProductReviews";
import { ProductPageContext } from "../ProductPage";
import { AppContext } from "../../../App";

const DescReview = () => {
  const { getCookie } = useContext(AppContext);
  const { product } = useContext(ProductPageContext);
  const reviewsCookie = getCookie(`product${product.id}reviews`);
  const reviewsArray = reviewsCookie ? JSON.parse(reviewsCookie) : [];

  const selectedBtnStyles = {
    borderTop: "3px solid var(--green)",
    borderLeft: "1px solid var(--green)",
    borderRight: "1px solid var(--green)",
  };
  const [btnStyles, setBtnStyles] = useState({
    descBtnStyle: selectedBtnStyles,
    revBtnStyle: {},
  });
  const [divDisplayed, setDivDisplayed] = useState("desc");

  function handleDivSwitch(e) {
    if (e.target.value === "rev") {
      setBtnStyles({
        descBtnStyle: {},
        revBtnStyle: selectedBtnStyles,
      });
      setDivDisplayed("rev");
    } else {
      setBtnStyles({
        descBtnStyle: selectedBtnStyles,
        revBtnStyle: {},
      });
      setDivDisplayed("desc");
    }
  }

  return (
    <section className="desc-review">
      <span className="button-cont">
        <button
          className="div-button"
          value="desc"
          style={btnStyles.descBtnStyle}
          onClick={handleDivSwitch}
        >
          Description
        </button>
        <button
          className=" div-button"
          value="rev"
          style={btnStyles.revBtnStyle}
          onClick={handleDivSwitch}
        >
          Reviews{`(${reviewsArray.length})`}
        </button>
      </span>
      <div className="switching-divs">
        {divDisplayed === "desc" ? (
          <LongDesc />
        ) : (
          <ProductReviews reviewsArray={reviewsArray} />
        )}
      </div>
    </section>
  );
};
export default DescReview;
