import "../../assets/styles/product-page/product-style.css";
import "../../assets/styles/product-page/product-laptop-style.css";
import "../../assets/styles/product-page/product-tab-style.css";
import "../../assets/styles/product-page/product-mobile-style.css";

import { useLocation, useParams } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import DescReview from "./components/DescReview";
import RelatedProducts from "./components/RelatedProducts";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import AddedToCart from "./components/AddedToCart";
import demoShoeData from "../../demo-arrays/demoShoeData";

export const ProductPageContext = createContext("");

const ProductPage = () => {
  const {
    user,
    setCartRefresh,
    cartProducts,
    setCookie,
    setProducts,
    setRecentProducts,
  } = useContext(AppContext);
  const { id } = useParams();

  const displayedProduct = demoShoeData.find(
    (item) => item.id === parseInt(id)
  );
  const relatedProducts = demoShoeData.filter(
    (item) => item.categories === displayedProduct.categories
  );
  const [addedOpen, setAddedOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addedQuantity = useRef(0);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const { pathname } = useLocation();

  function handleNoLogCart() {
    const { image, shoename, price, id } = displayedProduct;
    const cartItem = {
      image,
      shoename,
      quantity,
      price,
      productId: id,
      id: id,
    };

    const foundProduct = cartProducts.find(
      (item) => item.productId === cartItem.productId
    );
    if (foundProduct) {
      setProducts((prevState) => {
        const updatedItems = prevState.map((item) => {
          if (item.productId === cartItem.productId) {
            item.quantity = item.quantity + cartItem.quantity;
          }
          return item;
        });
        setCookie("noLogCart", JSON.stringify(updatedItems), 7);
        return updatedItems;
      });
    } else {
      const cartItemId =
        cartProducts.length > 0
          ? cartProducts[cartProducts.length - 1].id + 1
          : 1;
      setCookie(
        "noLogCart",
        JSON.stringify([...cartProducts, { ...cartItem, cartItemId }], 7)
      );
      setCartRefresh(true);
    }
    addedQuantity.current = quantity;
    setAddedOpen(true);
  }

  function handleAddCart() {
    setDisabledBtn(true);
    const { image, shoename, price, id } = displayedProduct;
    const cartItem = {
      image,
      shoename: shoename,
      quantity,
      price,
      productId: id,
    };

    const foundProduct = cartProducts.find(
      (item) => item.productId === cartItem.productId
    );
    if (foundProduct) {
      setProducts((prevState) => {
        const updatedItems = prevState.map((item) => {
          if (item.productId === cartItem.productId) {
            item.quantity = item.quantity + cartItem.quantity;
          }
          return item;
        });
        setCookie(`user${user.id}`, JSON.stringify(updatedItems), 1);
        return updatedItems;
      });
    } else {
      const cartItemId =
        cartProducts.length > 0
          ? cartProducts[cartProducts.length - 1].cartItemId + 1
          : 1;
      setCookie(
        `user${user.id}`,
        JSON.stringify([...cartProducts, { ...cartItem, cartItemId }]),
        1
      );
    }
    setCartRefresh(true);
    addedQuantity.current = quantity;
    setAddedOpen(true);
    setDisabledBtn(false);
  }

  function handleQuantity(func) {
    if (func === "add") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    }
  }

  const ProductPageContextValues = {
    product: displayedProduct,
    relatedProducts,
    quantity,
    setQuantity,
    handleAddCart,
    handleQuantity,
    handleNoLogCart,
    disabledBtn,
    comments: [],
  };

  useEffect(() => {
    setRecentProducts(displayedProduct);
  }, [setRecentProducts, displayedProduct]);

  useEffect(() => {
    setAddedOpen(false);
  }, [pathname]);

  return (
    <main className="product-page">
      <ProductPageContext.Provider value={ProductPageContextValues}>
        {addedOpen && (
          <AddedToCart
            quantity={addedQuantity.current}
            productName={displayedProduct.shoename}
          />
        )}
        <ProductDetails />
        <DescReview />
        <RelatedProducts />
      </ProductPageContext.Provider>
    </main>
  );
};
export default ProductPage;
