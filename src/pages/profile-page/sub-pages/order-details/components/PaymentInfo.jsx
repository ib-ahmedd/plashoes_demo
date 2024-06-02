import demoShoeData from "../../../../../demo-arrays/demoShoeData";

const PaymentInfo = ({ orderDetails }) => {
  const { quantity, totalPrice, productId } = orderDetails;

  const product = demoShoeData.find((item) => item.id === productId);
  const { price } = product ? product : { price: 0 };
  return (
    <article className="payment-info infos">
      <h3>PAYMENT INFORMATION</h3>
      <div>
        <span>
          <h4>Payment Method</h4>
          <p>Pay with Cards, Bank Transfer or USSD</p>
        </span>
        <span>
          <h4>Payment Details</h4>
          <p>Unit price: ${price.toFixed(2)}</p>
          <p>Quantity: {quantity}</p>
          <p>Total: ${totalPrice}</p>
        </span>
      </div>
    </article>
  );
};
export default PaymentInfo;
