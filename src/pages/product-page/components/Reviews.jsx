import ReviewComment from "./ReviewComment";

const Reviews = ({ reviews }) => {
  console.log(reviews);
  const displayedComments = reviews.map((item) => (
    <ReviewComment key={item.id} {...item} />
  ));
  return <div className="review-comments">{displayedComments}</div>;
};
export default Reviews;
