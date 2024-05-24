import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { productCategories, productColors, productDiscounts, sortByOptions } from "../../../constants/index.js";
import { PriceRange, ResetButton, SearchButton, ViewStyle, DisplayGridProducts } from "./Componets";
import { useProductsContext } from "./ProductsContext";
import { ScrollToTop } from "../HomePage/Components.jsx";

const LargeScreenUI = () => {
  const {
    selectedCompanies,
    setSelectedCompanies,
    searchInput,
    setSearchInput,
    selectedColors,
    setSelectedColors,
    handleColorClick,
    selectedSortOption,
    setSelectedSortOption,
    sortedProducts,
    minPrice,
    maxPrice,
    selectedDiscount,
    setSelectedDiscount,
  } = useProductsContext();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam);
  }, [location.search]);

  const filteredProducts = sortedProducts.filter((product) => {
    const isCategoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const isCompanyMatch = selectedCompanies[0].isChecked || selectedCompanies.some((company) => company.isChecked && company.label === product.company);
    const isColorMatch = selectedColors.length === 0 || selectedColors.some((color) => product.color.includes(color));
    const isPriceMatch = (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
    const isSearchMatch = !searchInput || product.productType.some((type) => type.toLowerCase().includes(searchInput.toLowerCase()));
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

    return isCategoryMatch && isCompanyMatch && isColorMatch && isPriceMatch && isSearchMatch && isDiscountMatch;
  });

  const handleCategoryClick = (index) => () => {
    setActiveCategoryIndex((prevIndex) => (prevIndex === index ? null : index));
    setSelectedCategory(index === 0 ? null : productCategories[index].label);
    navigate(`/products?category=${index === 0 ? '' : productCategories[index].label}`);
    window.scrollTo(0, 0);
  };

  const handleCompanyCheckboxChange = (index) => {
    const updatedCompanies = selectedCompanies.map((company, idx) => {
      if (index === 0) {
        // If "All" is selected, set isChecked to true for "All" and false for other companies
        return { ...company, isChecked: idx === 0 };
      } else if (idx === 0) {
        // If another company is selected, set "All" to false
        return { ...company, isChecked: false };
      } else if (index === idx) {
        // If the clicked company is selected, toggle its isChecked
        return { ...company, isChecked: !company.isChecked };
      } else {
        // If another company is selected, keep its state unchanged
        return company;
      }
    });
    setSelectedCompanies(updatedCompanies);
  };

  const handleSortOptionChange = (option) => {
    setSelectedSortOption(option);
  };

  const InputSection = () => (
    <input
      type="text"
      placeholder="Search"
      className="rounded py-2 px-4"
      style={{ backgroundColor: `var(--header-bg-color)` }}
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );

  const CategorySection = () => (
    <>
      <h2 className="font-bold text-lg my-3 tracking-[2px]">Category</h2>
      <ul>
        {productCategories.map((category, index) => (
          <li
            key={category.label}
            onClick={handleCategoryClick(index)}
            style={{
              textDecoration:
                activeCategoryIndex === index ? "underline" : "none",
            }}
            className="my-1 cursor-pointer"
          >
            {category.label}
          </li>
        ))}
      </ul>
    </>
  );

  const CompanySection = () => (
    <>
      <h2 className="font-bold text-lg my-3 tracking-[2px]">Company</h2>
      <ul>
        {selectedCompanies.map((company, index) => (
          <li key={company.label}>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={index === 0 ? company.isChecked : company.isChecked}
                onChange={() => handleCompanyCheckboxChange(index)}
                className="mr-1 mb-2"
              />
              {company.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  );

  const SortBySection = () => (
    <>
      <h2 className="font-bold text-lg my-3 tracking-[2px]">Sort By </h2>
      <div className="flex flex-col">
        {sortByOptions.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              value={option.value}
              checked={selectedSortOption === option.value}
              onChange={() => handleSortOptionChange(option.value)}
              className="mb-2 mr-1"
            />
            {option.element}
          </label>
        ))}
      </div>
    </>
  );

  const ColorsSection = () => (
    <>
      <h2 className="font-bold text-lg my-3 tracking-[2px]">Colors </h2>
      <ul className="flex flex-wrap gap-2 mr-7 max-lg:w-[250px]">
        {productColors.map((color) => (
          <li
            key={color.name}
            className={`relative w-6 h-6 rounded-full border cursor-pointer`}
            style={{ backgroundColor: `${color.name}` }}
            onClick={() => handleColorClick(color.name)}
          >
            {selectedColors.includes(color.name) && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#f0ececda] font-extrabold text-[15px]">
                ✓
              </span>
            )}
          </li>
        ))}
        <li
          className="relative w-6 h-6 rounded-full border cursor-pointer"
          onClick={() => handleColorClick("multicolor")}
        >
          <img
            src="https://img.freepik.com/free-vector/colorful-rainbow-background_23-2147805840.jpg?t=st=1714131695~exp=1714135295~hmac=25c51b5e7be253ac68cfb1d858fdc99c7ea183898250caceb84367898b94bed8&w=740"
            className="rounded-full"
            alt=""
          />
          {selectedColors.includes("multicolor") && (
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#f0ececda] font-extrabold text-[15px]">
              ✓
            </span>
          )}
        </li>
      </ul>
      {selectedColors.length > 0 && (
        <button
          className="mt-4 bg-red-500 text-white p-1 rounded-md"
          onClick={() => setSelectedColors([])}
        >
          Deselect All
        </button>
      )}
    </>
  );

  const DiscountSection = () => (
    <>
      <h2 className="font-bold text-lg -mt-6 mb-2 tracking-[2px]">
        Discount Range
      </h2>
      <div className="flex flex-col mb-7">
        {productDiscounts.map((discount) => (
          <label key={discount.value} className="cursor-pointer">
            <input
              type="radio"
              value={discount.value}
              checked={selectedDiscount === discount.value}
              onChange={() => setSelectedDiscount(discount.value)}
              className="mb-2 mr-1"
            />
            {discount.name}
          </label>
        ))}
      </div>
    </>
  );

  return (
    <div className="max-lg:hidden">
      <ScrollToTop />
      <div className="flex">
        <div className="flex-shrink-0 w-1/5 ml-10 mb-5">
          <div className="sticky top-0">
            <div>{InputSection()}</div>
            <div>{SortBySection()}</div>
            <div>{CategorySection()}</div>
            <div>{CompanySection()}</div>
            <div>{ColorsSection()}</div>
            <div>
              <h2 className="font-bold text-lg my-3 tracking-[2px]">
                Price Range
              </h2>
              <PriceRange />
            </div>
            <div>{DiscountSection()}</div>
            <div>
              <SearchButton />
            </div>
            <div>
              <ResetButton />
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <ViewStyle products={filteredProducts} />
          <DisplayGridProducts products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default LargeScreenUI;
