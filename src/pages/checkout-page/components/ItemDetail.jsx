const ItemDetail = ({ shoename, image, price, quantity }) => {
  const subtotal = (price * quantity).toFixed(2);
  return (
    <span className="item-detail">
      <span>
        <div className="image">
          <img src={image} alt={shoename} />
        </div>
        <p>
          {shoename} x {quantity}
        </p>
      </span>
      <p>${subtotal}</p>
    </span>
  );
};
export default ItemDetail;
