const ApiImage = ({ image, shoename }) => {
  return (
    <div className="image">
      <img src={image} alt={shoename} />
    </div>
  );
};
export default ApiImage;
