import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../App";

const ScrollTopBtn = ({ inView }) => {
  const { pushScrollTop } = useContext(AppContext);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [pathname]);
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="scroll-top-btn"
      style={{
        transform:
          !inView && (pushScrollTop ? "translateY(-4em)" : "translateY(0)"),
        display: hidden && "none",
      }}
    >
      <FontAwesomeIcon icon={faAnglesUp} />
    </button>
  );
};
export default ScrollTopBtn;
