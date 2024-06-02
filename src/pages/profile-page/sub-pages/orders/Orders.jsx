import { useCallback, useContext, useEffect, useState } from "react";
import OrderBtn from "./components/OrderBtns";
import InitOrders from "./components/InitOrders";
import { AppContext } from "../../../../App";
import ClosedOrders from "./components/ClosedOrders";

const Orders = () => {
  const { user, getCookie } = useContext(AppContext);
  const [activeButton, setActiveButton] = useState("open");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toggleOrders = (btn) => {
    setActiveButton(btn);
  };

  const getOrders = useCallback(async () => {
    if (user.id) {
      const orderCookie = getCookie(`user${user.id}orders`);
      const userOrders = orderCookie ? JSON.parse(orderCookie) : [];
      setOrders(userOrders);
      setLoading(false);
    }
  }, [user.id, getCookie]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const openOrders = orders.filter((item) => item.orderStatus === "Processing");

  const closedOrders = orders.filter(
    (item) => item.orderStatus === "Delivered"
  );
  return (
    <section className="orders">
      <div className="orders-body">
        <span className="orders-btns">
          <OrderBtn
            text={`OPEN ORDERS (${openOrders.length})`}
            btn={"open"}
            activeBtn={activeButton}
            toggleOrders={toggleOrders}
          />
          <OrderBtn
            text={`CLOSED ORDERS (${closedOrders.length})`}
            btn={"close"}
            activeBtn={activeButton}
            toggleOrders={toggleOrders}
          />
        </span>
        {activeButton === "open" ? (
          openOrders.length > 0 ? (
            <InitOrders orders={openOrders} loading={loading} />
          ) : (
            <p className="empty-profile-tab">You have no open orders</p>
          )
        ) : closedOrders.length > 0 ? (
          <ClosedOrders orders={closedOrders} loading={loading} />
        ) : (
          <p className="empty-profile-tab">You have no closed orders</p>
        )}
      </div>
    </section>
  );
};
export default Orders;
