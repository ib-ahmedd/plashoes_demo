import { createContext, useCallback, useEffect, useState } from "react";
import CountSort from "./components/CountSort";
import SearchProductsCont from "./components/SearchProductsCont";

import "../../assets/styles/search-page/search-style.css";
import "../../assets/styles/search-page/search-laptop-style.css";
import "../../assets/styles/search-page/search-tab-style.css";
import "../../assets/styles/search-page/search-mobile-style.css";
import { useLocation } from "react-router-dom";
import SearchBar from "../navbar/search-bar/SearchBar";
import demoShoeData from "../../demo-arrays/demoShoeData";
import sortOptionsArrays from "../../demo-arrays/sortOptionsArrays";

export const SearchPageContext = createContext("");

const SearchPage = () => {
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [itemsCount, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Default sorting");
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [itemNumbers, setItemNumbers] = useState({ start: 1, end: 12 });

  const getSearchProducts = useCallback(async () => {
    setCurrentPage(1);
    setItemNumbers({ start: 1, end: 12 });
    setLoading(true);
    const products = demoShoeData.filter(
      (item) =>
        item.shoename.toLowerCase().includes(state.toLowerCase()) ||
        item.image.toLowerCase().includes(state.toLowerCase())
    );
    setProducts(products);
    setCount(products.length);
    setLoading(false);
  }, [state]);

  const handleCountPage = useCallback(() => {
    if (products.length > 12) {
      const pageProducts = products.filter(
        (item) => products.indexOf(item) < 12
      );
      setDisplayedProducts(pageProducts);
    } else {
      setDisplayedProducts(products);
    }
    setCount(products.length);
  }, [products]);

  function handleCurrentPage(buttonNo) {
    setLoading(true);
    setCurrentPage(buttonNo);
    setItemNumbers({
      start: buttonNo === 1 ? 1 : 13,
      end: buttonNo === 1 ? 12 : products.length,
    });
    const onScreenProducts = products.filter((item) =>
      buttonNo === 1 ? products.indexOf(item) < 12 : products.indexOf(item) > 11
    );
    setDisplayedProducts(onScreenProducts);
    setLoading(false);
  }

  function handleChange(e) {
    const option = e.target.value;

    const sortedProducts = [];

    switch (option) {
      case "popularity":
        sortOptionsArrays.popularity.forEach((number) => {
          const foundProduct = products.find((item) => item.id === number);
          if (foundProduct) return sortedProducts.push(foundProduct);
        });
        break;
      case "average rating":
        sortOptionsArrays.averageRating.forEach((number) => {
          const foundProduct = products.find((item) => item.id === number);
          if (foundProduct) return sortedProducts.push(foundProduct);
        });
        break;
      case "latest":
        sortOptionsArrays.latest.forEach((number) => {
          const foundProduct = products.find((item) => item.id === number);
          if (foundProduct) return sortedProducts.push(foundProduct);
        });
        break;
      case "price: low to high":
        sortOptionsArrays.priceLow.forEach((number) => {
          const foundProduct = products.find((item) => item.id === number);
          if (foundProduct) return sortedProducts.push(foundProduct);
        });
        break;
      case "price: high to low":
        sortOptionsArrays.priceHigh.forEach((number) => {
          const foundProduct = products.find((item) => item.id === number);
          if (foundProduct) return sortedProducts.push(foundProduct);
        });
        break;
      default:
        sortOptionsArrays.default.forEach((number) => {
          const foundProduct = products.find((item) => item.id === number);
          if (foundProduct) return sortedProducts.push(foundProduct);
        });
    }

    setProducts(sortedProducts);
    setOffset(0);
    setSortOption(e.target.value);
    setCurrentPage(1);
    setItemNumbers({ start: 1, end: 12 });
  }

  useEffect(() => {
    getSearchProducts();
  }, [getSearchProducts]);

  useEffect(() => {
    handleCountPage();
  }, [products, handleCountPage]);

  useEffect(() => {
    setSortOption("Default sorting");
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const SearchPageContextValue = {
    count: itemsCount,
    currentPage,
    sortOption,
    handleChange,
    setItemNumbers,
    offset,
    handleCurrentPage,
  };

  return (
    <main className="search-page">
      <SearchPageContext.Provider value={SearchPageContextValue}>
        <h1>Search</h1>
        <SearchBar />
        {!isLoading && itemsCount > 0 && (
          <CountSort itemNumbers={itemNumbers} count={itemsCount} />
        )}
        <SearchProductsCont
          isLoading={isLoading}
          products={displayedProducts}
          count={itemsCount}
        />
      </SearchPageContext.Provider>
    </main>
  );
};
export default SearchPage;
