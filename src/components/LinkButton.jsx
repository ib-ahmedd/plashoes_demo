import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LinkButton = ({
  text,
  path,
  state,
  onlyTab,
  onlyDesktop,
  setMenuOpen,
}) => {
  const { handleMouseDown } = useContext(AppContext);
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [specificClass, setSpecificClass] = useState("");
  useEffect(() => {
    if (pathname === path) {
      setIsActive(true);
    }

    return () => {
      setIsActive(false);
    };
  }, [pathname, path]);
  useEffect(() => {
    if (onlyTab) {
      setSpecificClass("tab-only-link");
    } else if (onlyDesktop) {
      setSpecificClass("desktop-only-link");
    } else {
      setSpecificClass("");
    }
  }, [onlyTab, onlyDesktop]);
  return (
    <NavLink
      to={path}
      onClick={() => {
        setMenuOpen && setMenuOpen(false);
      }}
      style={
        text === "PROFILE"
          ? {
              border: "1px solid",
              marginBottom: "2em",
              color: "var(--green)",
            }
          : {
              color: isActive && "#222",
              backgroundColor: clicked && "var(--clicked-grey)",
              boxShadow: isActive && "none",
            }
      }
      className={
        isActive
          ? `${specificClass} active-link-btn link-buttons`
          : `${specificClass} link-buttons`
      }
      state={state}
      onMouseDown={() => {
        handleMouseDown(setClicked);
      }}
    >
      {text === "PROFILE" && (
        <span
          style={{
            fontSize: "1.5em",
            marginRight: "0.5em",
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </span>
      )}
      {text}
    </NavLink>
  );
};

export default LinkButton;
