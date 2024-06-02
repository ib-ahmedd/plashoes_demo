import "../../assets/styles/shop-page/shop-style.css";
import "../../assets/styles/shop-page/shop-laptop-style.css";
import "../../assets/styles/shop-page/shop-tab-style.css";
import "../../assets/styles/shop-page/shop-mobile-style.css";

import ShopProductsContainer from "./components/ShopProductsContainer";
import FilterMenu from "./components/FilterMenu";
import { useState, createContext, useEffect, useCallback } from "react";
import ScreenCover from "../../components/ScreenCover";
import FilterSort from "./components/FilterSort";
import SearchBar from "../navbar/search-bar/SearchBar";
import { useLocation } from "react-router-dom";
import demoShoeData from "../../demo-arrays/demoShoeData";
import sortOptionsArrays from "../../demo-arrays/sortOptionsArrays";

export const ShopPageContext = createContext("");

const ShopPage = ({ page }) => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [itemsCount, setCount] = useState(0);

  const { state } = useLocation();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [maxAndMinPrice, setMaxAndMinPrice] = useState({
    maxPrice: 0,
    minPrice: 0,
  });

  const [priceRange, setPriceRange] = useState(0);
  const [sortOption, setSortOption] = useState(
    state ? state : "Default sorting"
  );
  const [filterCategory, setCategory] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [itemNumbers, setItemNumbers] = useState({ start: 1, end: 12 });

  const getPageProducts = useCallback(async () => {
    setCategory("Default");
    setCurrentPage(1);
    setOffset(0);
    setItemNumbers({ start: 1, end: 12 });
    setLoading(true);
    if (page === "Men" || page === "Women") {
      const products = demoShoeData.filter((item) => item.gender === page);
      setProducts(products);
      const categories = [];

      demoShoeData.forEach((item) => {
        if (!categories.includes(item.categories) && item.gender === page) {
          categories.push(item.categories);
        }
      });
      setCount(products.length);
      setProductCategories(categories);
      setMaxAndMinPrice({
        minPrice: page === "Men" ? 80 : 65,
        maxPrice: page === "Men" ? 105 : 115,
      });
      setPriceRange(page === "Men" ? 105 : 115);
      setLoading(false);
    } else if (page === "Shop") {
      setProducts(demoShoeData);
      const categories = [];

      demoShoeData.forEach((item) => {
        if (!categories.includes(item.categories)) {
          categories.push(item.categories);
        }
      });
      setMaxAndMinPrice({ minPrice: 65, maxPrice: 115 });
      setPriceRange(115);
      setCount(demoShoeData.length);
      setProductCategories(categories);
      setLoading(false);
    } else if (page === "Sale") {
      const filterShoes = demoShoeData.filter((item) => item.sale);
      setProducts(filterShoes);
      const categories = [];

      demoShoeData.forEach((item) => {
        if (!categories.includes(item.categories) && item.sale) {
          categories.push(item.categories);
        }
      });
      setMaxAndMinPrice({ minPrice: 65, maxPrice: 115 });
      setPriceRange(115);
      setCount(demoShoeData.length);
      setProductCategories(categories);
      setLoading(false);
    }
  }, [page]);

  function handleCurrentPage(buttonNo) {
    setLoading(true);
    setCurrentPage(buttonNo);
    if (priceRange === maxAndMinPrice.maxPrice) {
      setItemNumbers({
        start: buttonNo === 1 ? 1 : 13,
        end: buttonNo === 1 ? 12 : 20,
      });
      const onScreenProducts = products.filter((item) =>
        buttonNo === 1
          ? products.indexOf(item) < 12
          : products.indexOf(item) > 11
      );
      setDisplayedProducts(onScreenProducts);
    } else {
      setItemNumbers({
        start: buttonNo === 1 ? 1 : 13,
        end: buttonNo === 1 ? 12 : products.length,
      });
      const onScreenProducts = products.filter((item) =>
        buttonNo === 1
          ? products.indexOf(item) < 12
          : products.indexOf(item) > 11
      );
      setDisplayedProducts(onScreenProducts);
    }
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

  function handlePriceChange(e) {
    setPriceRange(e.target.value);
  }

  function handleFilterPrice(func) {
    if (func === "set") {
      let productsArray = [];
      if (page !== "Sale") {
        productsArray = demoShoeData.filter((item) => {
          if (filterCategory === "Default") {
            if (item.price <= priceRange) {
              return item;
            }
            return null;
          } else {
            if (
              item.price <= priceRange &&
              item.categories === filterCategory
            ) {
              return item;
            }
            return null;
          }
        });
      } else {
        productsArray = demoShoeData.filter((item) => {
          if (filterCategory === "Default") {
            if (item.price <= priceRange && item.sale) {
              return item;
            }
            return null;
          } else {
            if (
              item.price <= priceRange &&
              item.sale &&
              item.categories === filterCategory
            ) {
              return item;
            }
            return null;
          }
        });
      }
      const sortedProducts = handleAutoSort(productsArray);
      setProducts(sortedProducts);
      setCount(products.length);
      setMenuOpen(false);
      setCurrentPage(1);
      setItemNumbers({ start: 1, end: 12 });
    } else {
      let productsArray = [];
      if (page !== "Sale") {
        if (filterCategory === "Default") {
          productsArray = demoShoeData;
        } else {
          productsArray = demoShoeData.filter(
            (item) => item.categories === filterCategory
          );
        }
      } else {
        if (filterCategory === "Default") {
          productsArray = demoShoeData.filter((item) => item.sale);
        } else {
          productsArray = demoShoeData.filter(
            (item) => item.categories === filterCategory && item.sale
          );
        }
      }
      const sortedProducts = handleAutoSort(productsArray);
      setProducts(sortedProducts);
      setPriceRange(page === "Men" ? 105 : 115);
      setMenuOpen(false);
      setCurrentPage(1);
      setItemNumbers({ start: 1, end: 12 });
    }
  }

  function handleFilterCat(cat) {
    setCategory(cat);
    let productsCatArray = [];
    if (page !== "Sale") {
      if (cat === "Default" && priceRange === maxAndMinPrice.maxPrice) {
        productsCatArray = demoShoeData.filter((item) => item.id < 13);
      } else if (cat === "Default" && priceRange !== maxAndMinPrice.maxPrice) {
        const productsArray = demoShoeData.filter(
          (item) => item.price < priceRange
        );
        if (productsArray.length > 12) {
          productsCatArray = productsArray.filter(
            (item) => productsArray.indexOf(item) < 12
          );
        } else {
          productsCatArray = productsArray;
        }
      }

      if (cat !== "Default") {
        productsCatArray = demoShoeData.filter(
          (item) => item.categories === cat && item.price <= priceRange
        );
      }
    } else {
      if (cat === "Default") {
        productsCatArray = demoShoeData.filter(
          (item) => item.price < priceRange && item.sale
        );
      } else if (cat !== "Default") {
        productsCatArray = demoShoeData.filter(
          (item) =>
            item.categories === cat && item.price <= priceRange && item.sale
        );
      }
    }

    const sortedProducts = handleAutoSort(productsCatArray);

    setProducts(sortedProducts);
    setMenuOpen(false);
    setCurrentPage(1);
    setItemNumbers({ start: 1, end: 12 });
  }

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

  const handleAutoSort = useCallback(
    (array) => {
      const sortedProducts = [];
      if (array.length > 0) {
        switch (sortOption) {
          case "popularity":
            sortOptionsArrays.popularity.forEach((number) => {
              const foundProduct = array.find((item) => item.id === number);
              if (foundProduct) return sortedProducts.push(foundProduct);
            });
            break;
          case "average rating":
            sortOptionsArrays.averageRating.forEach((number) => {
              const foundProduct = array.find((item) => item.id === number);
              if (foundProduct) return sortedProducts.push(foundProduct);
            });
            break;
          case "latest":
            sortOptionsArrays.latest.forEach((number) => {
              const foundProduct = array.find((item) => item.id === number);
              if (foundProduct) return sortedProducts.push(foundProduct);
            });
            break;
          case "price: low to high":
            sortOptionsArrays.priceLow.forEach((number) => {
              const foundProduct = array.find((item) => item.id === number);
              if (foundProduct) return sortedProducts.push(foundProduct);
            });
            break;
          case "price: high to low":
            sortOptionsArrays.priceHigh.forEach((number) => {
              const foundProduct = array.find((item) => item.id === number);
              if (foundProduct) return sortedProducts.push(foundProduct);
            });
            break;
          default:
            array.forEach((item) => sortedProducts.push(item));
        }
      }
      return sortedProducts;
    },
    [sortOption]
  );

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  useEffect(() => {
    if (state) {
      const sortedProducts = handleAutoSort(products);
      setProducts(sortedProducts);
    }
  }, [products, state, handleAutoSort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    getPageProducts();
  }, [getPageProducts]);

  useEffect(() => {
    handleCountPage();
  }, [products, handleCountPage]);

  const shopContextValue = {
    maxAndMinPrice,
    handleChange,
    handleFilterCat,
    handleFilterPrice,
    page,
    category: page,
    sortOption,
    isMenuOpen,
    toggleMenu,
    priceRange,
    handlePriceChange,
    count: itemsCount,
    currentPage,
    handleCurrentPage,
    offset,
    itemNumbers,
    setItemNumbers,
    filterCategory,
    productCategories,
  };

  return (
    <main className="shop-page">
      <ShopPageContext.Provider value={shopContextValue}>
        {isMenuOpen && <ScreenCover toggleMenu={toggleMenu} />}
        <FilterMenu />
        <h1>{page}</h1>
        <SearchBar />
        <FilterSort />
        <ShopProductsContainer
          products={displayedProducts}
          isLoading={isLoading}
          count={itemsCount}
        />
      </ShopPageContext.Provider>
    </main>
  );
};

export default ShopPage;
