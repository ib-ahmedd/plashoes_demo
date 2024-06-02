import { useContext } from "react";
import RatingStars from "../../../components/RatingStars";
import { AppContext } from "../../../App";

const ReviewComment = ({
  userId,
  stars,
  reviewTitle,
  reviewDetail,
  reviewDate,
  reviewName,
}) => {
  const { user } = useContext(AppContext);
  return (
    <article className="comment">
      <RatingStars stars={stars} />
      <h4>{reviewTitle}</h4>
      <p>{reviewDetail}</p>
      <p>
        {reviewDate} by{" "}
        <strong>
          {reviewName}
          {userId === user.id && " (you)"}
        </strong>
      </p>
    </article>
  );
};
export default ReviewComment;
