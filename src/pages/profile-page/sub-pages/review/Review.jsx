import { useContext, useEffect, useRef, useState } from "react";
import RatingSect from "./components/RatingSect";
import ReviewSect from "./components/ReviewSect";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../../App";
import ReviewSuccess from "./components/ReviewSuccess";
import demoShoeData from "../../../../demo-arrays/demoShoeData";

const Review = () => {
  const { id } = useParams();
  const { getCookie, user, setCookie, getDate } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    reviewTitle: "",
    reviewDetail: "",
  });
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [success, setSuccess] = useState(false);
  const currentStarsCount = useRef(0);

  const product = demoShoeData.find((item) => item.id === parseInt(id));
  async function handleSubmit(e) {
    e.preventDefault();
    const review = {
      userId: user.id,
      reviewName: `${user.fname} ${user.lname}`,
      reviewTitle: inputs.reviewTitle,
      reviewDetail: inputs.reviewDetail,
      reviewDate: getDate(),
      stars: currentStarsCount.current,
    };
    const productReviewsCookie = getCookie(`product${id}reviews`);
    const productReviews = productReviewsCookie
      ? JSON.parse(productReviewsCookie)
      : [];
    if (productReviews.length > 0) {
      setCookie(
        `product${id}reviews`,
        JSON.stringify([...productReviews, review]),
        1
      );
    } else {
      setCookie(`product${id}reviews`, JSON.stringify([review]), 1);
    }

    const userOrdersCookie = getCookie(`user${user.id}orders`);
    const userOrdersArray = userOrdersCookie
      ? JSON.parse(userOrdersCookie)
      : [];
    const updatedItems = userOrdersArray.map((item) => {
      if (item.productId === parseInt(id)) {
        item.reviewed = true;
      }
      return item;
    });
    setCookie(`user${user.id}orders`, JSON.stringify(updatedItems), 1);
    setDisabledBtn(true);
    setSuccess(true);
  }
  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  function handleStars(starId) {
    setStars(starId + 1);
    currentStarsCount.current = starId + 1;
    setClicked(true);
  }
  function handleHover(starId) {
    setStars(starId + 1);
  }
  function handleMouseOut() {
    if (!clicked) {
      setStars(0);
    } else {
      setStars(currentStarsCount.current);
    }
  }
  useEffect(() => {
    const userOrdersCookie = getCookie(`user${user.id}orders`);
    const userOrdersArray = userOrdersCookie
      ? JSON.parse(userOrdersCookie)
      : [];
    const reivewItem = userOrdersArray.find(
      (item) => item.productId === parseInt(id) && item.reviewed === false
    );
    if (!reivewItem) {
      navigate("/profile/reviews");
    }
  }, [navigate, getCookie, id, user.id]);
  return (
    <section className="review-page">
      {!success ? (
        <>
          <h2>SELECT THE STARS TO RATE THE PRODUCT</h2>
          <RatingSect
            {...product}
            handleHover={handleHover}
            handleMouseOut={handleMouseOut}
            handleStars={handleStars}
            stars={stars}
          />
          <h2>LEAVE A REVIEW</h2>
          <ReviewSect
            inputs={inputs}
            handleInputs={handleInputs}
            handleSubmit={handleSubmit}
            disabledBtn={disabledBtn}
          />
        </>
      ) : (
        <ReviewSuccess />
      )}
    </section>
  );
};
export default Review;
