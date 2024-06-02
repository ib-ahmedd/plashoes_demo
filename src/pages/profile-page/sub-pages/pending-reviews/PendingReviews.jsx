import PendingProduct from "./components/PendingProduct";
import { useContext } from "react";
import { AppContext } from "../../../../App";

const PendingReviews = () => {
  const { user, getCookie } = useContext(AppContext);
  const userOrdersCookie = getCookie(`user${user.id}orders`);
  const userOrders = userOrdersCookie ? JSON.parse(userOrdersCookie) : [];
  const pendingReviews = userOrders.filter(
    (item) => item.orderStatus === "Delivered" && item.reviewed === false
  );

  const displayedProducts = pendingReviews.map((item) => (
    <PendingProduct key={item.id} {...item} />
  ));
  return (
    <section className="pending-reviews">
      {pendingReviews.length > 0 ? (
        displayedProducts
      ) : (
        <p className="empty-profile-tab">No pending reviews</p>
      )}
    </section>
  );
};
export default PendingReviews;
