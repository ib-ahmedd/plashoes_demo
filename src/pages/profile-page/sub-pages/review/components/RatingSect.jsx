import RatingStarsButtons from "../../../../../components/RatingStarsButtons";

const RatingSect = ({
  shoename,
  image,
  handleHover,
  handleMouseOut,
  handleStars,
  stars,
}) => {
  return (
    <div className="rating-sect">
      <div className="image">
        <img src={image} alt={shoename} />
      </div>
      <span>
        <p>{shoename}</p>
        <RatingStarsButtons
          stars={stars}
          handleStars={handleStars}
          handleMouseOut={handleMouseOut}
          handleHover={handleHover}
        />
      </span>
    </div>
  );
};
export default RatingSect;
