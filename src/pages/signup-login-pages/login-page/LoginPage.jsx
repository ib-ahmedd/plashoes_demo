import { useContext, useEffect, useState } from "react";

import "../../../assets/styles/login-signup-pages/login-signup-style.css";
import "../../../assets/styles/login-signup-pages/login-signup-tab-style.css";
import "../../../assets/styles/login-signup-pages/login-signup-mobile-style.css";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../../App";
import LinkButton from "../../../components/LinkButton";

const LoginPage = () => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [inputStyle, setInputStyle] = useState({});
  const [error, setError] = useState(false);
  const { state } = useLocation();
  const {
    logUserIn,
    cartProducts,
    setLoginState,
    loginState,
    setCookie,
    getCookie,
  } = useContext(AppContext);

  const errorStyle = {
    backgroundColor: "rgb(255, 218, 218)",
    border: "1px solid red",
  };

  function handleInputs(e) {
    const { name, value } = e.target;
    setDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
    setInputStyle({});
    setError(false);
  }

  function handleSubmit() {
    // e.preventDefault();
    let itemsPosted = 0;
    const usersCookie = getCookie("users");
    const usersArray = usersCookie ? JSON.parse(usersCookie) : [];
    const user = usersArray.find(
      (item) =>
        item.email === details.email && item.password === details.password
    );
    const path = loginState ? loginState : "/profile/account";
    if (user) {
      if (cartProducts.length > 0) {
        cartProducts.forEach(async (item) => {
          const userCartCookie = getCookie(`user${user.id}`);
          const userCartArray = userCartCookie
            ? JSON.parse(userCartCookie)
            : [];
          setCookie(
            `user${user.id}`,
            JSON.stringify([...userCartArray, item]),
            1
          );
          itemsPosted = itemsPosted + 1;
          if (itemsPosted === cartProducts.length) {
            logUserIn({ userInfo: user }, path);
          }
        });
      } else {
        logUserIn({ userInfo: user }, path);
      }
    } else {
      setInputStyle(errorStyle);
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoginState(state);
  }, [state, setLoginState]);

  return (
    <main className="login-page">
      <form
        className="login-modal"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            handleSubmit();
          }, 1500);
        }}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="on"
          value={details.email}
          onChange={handleInputs}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={details.password}
          onChange={handleInputs}
          style={inputStyle}
        />
        {loading ? (
          <button disabled style={{ backgroundColor: "var(--grey)" }}>
            Loading...
          </button>
        ) : (
          <button>LOGIN</button>
        )}
        {error && (
          <p className="incorrectDetails">Username or Password incorrect!</p>
        )}
        <span className="signup-forgot">
          <LinkButton text={"Sign up"} path={"/signup"} />
          <Link to={"/forgot-password"} replace className="frgt-pwd">
            Forgot password?
          </Link>
        </span>
      </form>
    </main>
  );
};
export default LoginPage;
