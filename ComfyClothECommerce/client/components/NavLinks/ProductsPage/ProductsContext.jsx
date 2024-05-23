import React, { createContext, useContext, useEffect, useState } from "react";
import { productCompanies, productCategories } from "../../../constants";
import { fetchProducts } from "../../../api/index";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [productCompany, setProductCompany] = useState("All");
  const [productCategory, setProductCategory] = useState("All");
  const [selectedCompanies, setSelectedCompanies] = useState(
    productCompanies.map((company, index) => ({
      ...company,
      isChecked: index === 0,
    }))
  );
  const [isGridClicked, setIsGridClicked] = useState(true);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data); 
        setSortedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    sortProducts(selectedSortOption);
  }, [selectedSortOption]);

  const sortProducts = (option) => {
    let sorted = [...products];

    switch (option) {
      case "priceLowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  };

  

  const handleGridClick = () => {
    if (!isGridClicked) {
      setIsGridClicked(true);
      setIsMenuClicked(false);
    }
  };

  const handleMenuClick = () => {
    if (!isMenuClicked) {
      setIsMenuClicked(true);
      setIsGridClicked(false);
    }
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSearchInput("");
    setProductCategory("All");
    setProductCompany("All");
    setSelectedCompanies(
      selectedCompanies.map((company, index) => ({
        ...company,
        isChecked: index === 0,
      }))
    );
    setSelectedColors([]);
    setSelectedDiscount(null);
  };

  const handleColorClick = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((color) => color !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
    window.scrollTo(0, 0);
  };

  const handleColorsDeselect = () => {
    setSelectedColors([]);
  };

  return (
    <ProductsContext.Provider
      value={{
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selectedCompanies,
        setSelectedCompanies,
        isGridClicked,
        setIsGridClicked,
        isMenuClicked,
        setIsMenuClicked,
        handleGridClick,
        handleMenuClick,
        handleReset,
        searchInput,
        setSearchInput,
        productCategory,
        setProductCategory,
        productCompany,
        setProductCompany,
        selectedColors,
        setSelectedColors,
        handleColorClick,
        handleColorsDeselect,
        selectedSortOption,
        setSelectedSortOption,
        sortProducts,
        sortedProducts,
        setSortedProducts,
        selectedDiscount,
        setSelectedDiscount
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
