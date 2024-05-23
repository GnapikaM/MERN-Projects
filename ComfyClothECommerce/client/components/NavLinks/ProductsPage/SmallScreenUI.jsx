import React, { useState, useEffect } from "react";

import { useTheme } from "../Theme/ThemeContext";
import {
  PriceRange,
  ResetButton,
  SearchButton,
  ViewStyle,
  DisplayGridProducts,
} from "./Componets";
import {
  productCategories,
  productColors,
  productCompanies,
  productDiscounts,
} from "../../../constants";
import { useProductsContext } from "./ProductsContext";
import { useNavigate, useLocation } from "react-router-dom";

const SmallScreenUI = () => {
  const { theme } = useTheme();
  const {
    searchInput,
    setSearchInput,
    sortedProducts,
    sortProducts,
    minPrice,
    maxPrice,
  } = useProductsContext();

  const [displayFilters, setDisplayFilters] = useState(false);
  const [displaySortFilters, setDisplaySortFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam);
  }, [location.search]);

  const handleFiltersButton = () => {
    setDisplayFilters(!displayFilters);
    setDisplaySortFilters(false);
  };

  const handleSortButton = () => {
    setDisplaySortFilters(!displaySortFilters);
    setDisplayFilters(false);
  };

  const filteredProducts = sortedProducts.filter((product) => {
    const isCategoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;
    const isCompanyMatch = selectedCompany
      ? product.company === selectedCompany
      : true;
    const isColorMatch =
      selectedColor && selectedColor !== "all"
        ? product.color.includes(selectedColor.toLowerCase())
        : true;
    const isPriceMatch =
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice);
    const isSearchMatch =
      !searchInput ||
      product.productType.some((type) =>
        type.toLowerCase().includes(searchInput.toLowerCase())
      );
    let isDiscountMatch = true;
    if (selectedDiscount) {
      switch (selectedDiscount) {
        case 10:
          isDiscountMatch = product.discount >= 10;
          break;
        case 20:
          isDiscountMatch = product.discount >= 20;
          break;
        case 30:
          isDiscountMatch = product.discount >= 30;
          break;
        case 40:
          isDiscountMatch = product.discount >= 40;
          break;
        case 50:
          isDiscountMatch = product.discount >= 50;
          break;
        case 60:
          isDiscountMatch = product.discount >= 60;
          break;
        case 70:
          isDiscountMatch = product.discount >= 70;
          break;
        case 80:
          isDiscountMatch = product.discount >= 80;
          break;
        case 90:
          isDiscountMatch = product.discount >= 90;
          break;
        default:
          isDiscountMatch = false;
      }
    }

    return (
      isCategoryMatch &&
      isCompanyMatch &&
      isPriceMatch &&
      isSearchMatch &&
      isDiscountMatch &&
      isColorMatch
    );
  });

  const handleBottomNavBar = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center ${
        theme === "dark" ? "bg-white text-black" : "bg-gray-700 text-white"
      }`}
    >
      <div
        className={`flex justify-center flex-shrink w-1/2 p-2`}
        onClick={handleFiltersButton}
      >
        <div className="text-2xl mr-2">
          <ion-icon name="options"></ion-icon>
        </div>
        <button className="font-bold text-lg">Filters</button>
      </div>
      <div
        className="flex justify-center flex-shrink w-1/2 p-2"
        onClick={handleSortButton}
      >
        <div className="text-2xl mr-2">
          <ion-icon name="swap-vertical"></ion-icon>
        </div>
        <button className="font-bold text-lg">Sort</button>
      </div>
    </div>
  );

  const InputSection = () => (
    <>
      <h2 className="font-medium">Search Product</h2>
      <input
        type="text"
        placeholder="Search"
        className="rounded py-2 px-4 w-[250px]"
        style={{ backgroundColor: `var(--header-bg-color)` }}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </>
  );

  const handleColorSelect = (color) => {
    setSelectedColor(color === "All" ? "" : color.toLowerCase());
  };

  const ColorsSection = () => (
    <>
      <h2 className="font-medium">Select Color</h2>
      <div className="flex relative items-center">
        <select
          id="favCompany"
          className="w-[250px]"
          value={selectedColor}
          onChange={(e) => handleColorSelect(e.target.value)}
        >
          <option value="all">All</option>
          {productColors.map((color) => (
            <option
              key={color.name}
              value={color.name}
              className="py-2 px-4 rounded"
              style={{ backgroundColor: `var(--header-bg-color)` }}
            >
              {color.name}
            </option>
          ))}
          <option value="multicolor">multicolor</option>
        </select>
        <div className="absolute right-3 top-[10px]">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </div>
    </>
  );

  const handleDiscountSelect = (discount) => {
    setSelectedDiscount(Number(discount));
  };

  const DiscountSection = () => (
    <>
      <h2 className="font-medium">Select Discount</h2>
      <div className="flex relative items-center">
        <select
          id="favCompany"
          className="w-[250px]"
          value={selectedDiscount}
          onChange={(e) => handleDiscountSelect(e.target.value)}
        >
          {productDiscounts.map((discount) => (
            <option
              key={discount.name}
              value={discount.value}
              className="py-2 px-4 rounded"
              style={{ backgroundColor: `var(--header-bg-color)` }}
            >
              {discount.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-[10px]">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </div>
    </>
  );

  const handleCompanySelect = (company) => {
    setSelectedCompany(company === "All" ? "" : company);
  };

  const CompanySection = () => (
    <>
      <h2 className="font-medium">Select Company</h2>
      <div className="flex relative items-center">
        <select
          id="favCompany"
          className="w-[250px]"
          value={selectedCompany}
          onChange={(e) => handleCompanySelect(e.target.value)}
        >
          {productCompanies.map((company) => (
            <option
              key={company.label}
              value={company.label}
              className="py-2 px-4 rounded"
              style={{ backgroundColor: `var(--header-bg-color)` }}
            >
              {company.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-[10px]">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </div>
    </>
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
    navigate(`/products?category=${category}`);
  };

  const CategorySection = () => (
    <>
      <h2 className="font-medium">Select Category</h2>
      <div className="flex relative items-center">
        <select
          id="favCompany"
          className="w-[250px]"
          value={selectedCategory}
          onChange={(e) => handleCategorySelect(e.target.value)}
        >
          {productCategories.map((category, index) => (
            <option
              key={category.label}
              value={category.label}
              className="py-2 px-4 rounded"
              style={{ backgroundColor: `var(--header bg-color)` }}
            >
              {category.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-[10px]">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </div>
    </>
  );

  const SortSection = () => (
    <ul
      className={`fixed left-0 right-0 z-20 bottom-[48px] text-lg font-medium text-center ${
        theme === "dark" ? "bg-white text-black" : "bg-gray-700 text-white"
      }`}
      // style={{ backgroundColor: `var(--header-bg-color)` }}
    >
      <li
        key="priceLowToHigh"
        className={`py-3`}
        onClick={() => sortProducts("priceLowToHigh")}
      >
        Price - Low to High
      </li>
      <li
        key="priceHighToLow"
        className="py-3"
        onClick={() => sortProducts("priceHighToLow")}
      >
        Price - High to Low
      </li>
    </ul>
  );

  return (
    <div
      className="lg:hidden"
      style={{ backgroundColor: `var(--body-bg-color)` }}
    >
      <div className="flex flex-col h-full">
        <div>
          <div>{handleBottomNavBar()}</div>
          {displayFilters && (
            <div
              className="flex flex-wrap justify-center gap-4 fixed left-0 right-0 bottom-12 z-20 py-20 max-[514px]:py-2"
              style={{ backgroundColor: `var(--body-bg-color)` }}
            >
              <div>{InputSection()}</div>
              <div>{CategorySection()}</div>
              <div>{CompanySection()}</div>
              <div>{ColorsSection()}</div>
              <div>
                <h2 className="font-medium">Select Price Range</h2>
                <PriceRange />
              </div>
              <div>{DiscountSection()}</div>
              <div>
                <SearchButton
                  setDisplayFilters={setDisplayFilters}
                  setDisplaySortFilters={setDisplaySortFilters}
                />
              </div>
              <div>
                <ResetButton />
              </div>
            </div>
          )}
          {displaySortFilters && <div>{SortSection()}</div>}
        </div>

        <div className="flex-grow">
          <ViewStyle products={filteredProducts} />
          <DisplayGridProducts products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default SmallScreenUI;
