import { Link } from "react-router-dom";

const SearchResultItem = ({ image, shoename, id }) => {
  return (
    <Link to={`/product/${id}`}>
      <img src={image} alt={shoename} />
      <p>{shoename}</p>
    </Link>
  );
};
export default SearchResultItem;
