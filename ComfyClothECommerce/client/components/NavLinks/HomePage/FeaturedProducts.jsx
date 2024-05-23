import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: "663123399e908f8e01a9f8e8",
      image: "https://img.freepik.com/premium-photo/beautiful-smiling-woman-wearing-modern-trendy-dress_208024-691.jpg?w=360",
      name: "Trendy Floral Dress",
      price: 1322,
    },
    {
      id: "663123399e908f8e01a9f8cc",
      image: "https://img.freepik.com/free-photo/attractive-man-standing-floor-wearing-watch_171337-20056.jpg?t=st=1714450584~exp=1714454184~hmac=8da9961a3f290ae4c2e0d059c2430a6312f8dba37dcda9a3fa95cf2223ef3198&w=360",
      name: "Men's Denim Jacket",
      price: 1035,
    },
    {
      id: "663123399e908f8e01a9f8e9",
      image: "https://img.freepik.com/premium-photo/beautiful-small-girl-with-blonde-hair-fashion-military-clothing_137237-993.jpg?w=360",
      name: "Girl's Tulle Skirt",
      price: 1086,
    },
    {
      id: "663123399e908f8e01a9f8c9",
      image: "https://img.freepik.com/free-photo/full-shot-woman-walking-beach_23-2150100078.jpg?t=st=1714104951~exp=1714108551~hmac=669782c922f96b30fef6e14e3c5eb21577f518c42a8e397c4deaec4673019314&w=360",
      name: "Women's Trench Coat",
      price: 2224,
    },
    {
      id: "663123399e908f8e01a9f8ea",
      image: "https://img.freepik.com/free-photo/vertical-shot-concentrated-businessman-listening-carefully-with-crossed-hands_181624-29443.jpg?t=st=1714471344~exp=1714474944~hmac=61ce3137b2bdaf150106c2747243dc3582a1875436bf9610cf1fa05bb9b49c2c&w=360",
      name: "Men's Dress Shirt",
      price: 1119,
    },
    {
      id: "663123399e908f8e01a9f8eb",
      image: "https://img.freepik.com/premium-photo/diamond-jewelry-luxury-fashion-jewelry_550617-5314.jpg?w=360",
      name: "Women Diamond Chain",
      price: 1750,
    }
  ]

  const openPost = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-[2px] mb-8 text-center py-2"
          style={{
            color: `var(--text-color)`,
          }}
        >
          Featured Products
        </h2>
          <div className="grid grid-cols-2 gap-2 max-[400px]:grid-cols-1 md:grid-cols-3 sm:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 max-sm:h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center max-sm:flex-col max-sm:text-white justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50">
                  <button
                    className="text-lg font-semibold py-2 px-4 bg-transparent text-white border border-white rounded-md hover:bg-white hover:text-black transition duration-300"
                    onClick={() => openPost(product.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-4 max-sm:p-2">
                <h3
                  className="text-xl font-semibold"
                  style={{ color: `var(--text-color)` }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-gray-600 font-semibold mt-2 max-sm:mt-1"
                  style={{ color: `var(--gray-color)` }}
                >
                  Rs. {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedProducts;
