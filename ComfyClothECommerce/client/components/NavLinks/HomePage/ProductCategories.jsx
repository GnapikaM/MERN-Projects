import React, { useEffect } from "react";
import { fetchProducts } from "../../../actions/ProductActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, imageSrc, description, handleClick }) => {
  return (
    <div className="relative group cursor-pointer rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" onClick={handleClick}>
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={category}
          className="w-full object-cover lg:h-[300px] h-[150px] max-lg:h-full "
          style={{ minWidth: "100%" }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <div className="text-center text-white">
          <h3 className="text-lg font-semibold">{category}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  }
  
  return (
    <section>
      <h2
        className="text-3xl md:text-4xl font-extrabold tracking-[2px] mb-8 text-center py-2"
        style={{
          color: `var(--text-color)`,
        }}
      >
        Product Categories
      </h2>
      <div className="flex p-2 flex-wrap items-center justify-center max-md:flex-col">
        <div className="flex-shrink w-2/5 p-2 lg:p-4 max-md:w-full max-lg:hidden">
          <h3
            className="text-2xl font-bold mb-5"
            style={{ color: `var(--text-color)` }}
          >
            Discover Your Style Haven
          </h3>
          <p style={{ color: `var(--text-color)` }}>
            Dive into our Style Haven and embark on a journey through an
            eclectic assortment of fashion marvels! From dapper ensembles for
            gentlemen to chic couture for ladies, and adorable outfits for the
            little ones, our collection has something for every member of the
            family. Unearth the latest trends, elevate your fashion game with
            stylish accessories, and curate outfits that reflect your unique
            personality. Explore, indulge, and let your style shine!
          </p>
        </div>
        <div className="flex-grow w-3/5 grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-6 max-md:w-full max-[600px]:grid-cols-2">
          <CategoryCard
            category="Men"
            imageSrc="https://img.freepik.com/free-photo/handsome-man-wearing-sunglasses-standing-grey-wall_171337-14981.jpg?t=st=1713620854~exp=1713624454~hmac=f31ff2e34e7f1808d06d1ba2616f196eca9a5ba55370d38a6e6ec42a04887fd4&w=360"
            description="Explore latest trends for men"
            handleClick = {() => handleCategoryClick("Men")}
          />
          <CategoryCard
            category="Women"
            imageSrc="https://img.freepik.com/free-photo/woman-with-shopping-bags-studio-yellow-background-isolated_1303-14284.jpg?t=st=1713622693~exp=1713626293~hmac=d00bbe04fb0852fd6e754e7e50bcc9a01d1ae1a65debe9422f395149f6046558&w=360"
            description="Discover the perfect look for women"
            handleClick = {() => handleCategoryClick("Women")}
          />
          <CategoryCard
            category="Accessories"
            imageSrc="https://img.freepik.com/free-photo/suitcase-with-traveler-accessories_1150-17823.jpg?t=st=1713622239~exp=1713625839~hmac=7e311908c97c3e51990ec0ef384ae08ef3e7370a91b05a7335e2038eb565994c&w=360"
            description="Adorable clothing for your little ones"
            handleClick = {() => handleCategoryClick("Accessories")}
          />
          <CategoryCard
            category="Girls"
            imageSrc="https://img.freepik.com/free-photo/full-length-portrait-cute-little-girl-hat_171337-13768.jpg?t=st=1713621577~exp=1713625177~hmac=0592444f5dfba2f76b85e609438a5a515e251d948c51ac99d7a726e451d3a77f&w=360"
            description="Fashion as playful as her imagination"
            handleClick = {() => handleCategoryClick("Girls")}
          />
          <CategoryCard
            category="Boys"
            imageSrc="https://img.freepik.com/free-photo/low-angle-little-boy-posing_23-2148445671.jpg?t=st=1713621492~exp=1713625092~hmac=d8598bb6ac8cdc98a51644e0e9428a77951072140a185bca53ec12796f89edcd&w=360"
            description="Style that grows with him"
            handleClick = {() => handleCategoryClick("Boys")}
          />
          <CategoryCard
            category="FootWear"
            imageSrc="https://img.freepik.com/free-photo/woman-legs-pink-pants-up-air_53876-88431.jpg?t=st=1713622176~exp=1713625776~hmac=e36c7ab2c5ebaf765c62ab3b0328e482f0f34e4935ddf388bbe9d99a8a30b458&w=360"
            description="Step into sophistication and comfort"
            handleClick = {() => handleCategoryClick("FootWear")}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
