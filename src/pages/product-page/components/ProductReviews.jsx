import Reviews from "./Reviews";

const ProductReviews = ({ divStyles, reviewsArray }) => {
  return (
    <div className="product-review" style={divStyles}>
      {reviewsArray.length > 0 ? (
        <Reviews reviews={reviewsArray} />
      ) : (
        <p className="review-sf">There are no reviews yet.</p>
      )}
    </div>
  );
};
export default ProductReviews;
