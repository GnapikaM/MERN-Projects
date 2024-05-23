import React from "react";
import { Link } from "react-router-dom";

const FeaturedContent = () => {
  const featuredContent = [
    {
      id: 1,
      title: "Spring Fashion Trends 2024",
      image: "https://img.freepik.com/premium-photo/young-woman-looking-away-while-sitting-truck_1048944-21613883.jpg?w=900",
      category: "Style Guide",
      link: "/styleGuide",
    },
    {
      id: 2,
      title: "10 Must-Have Accessories for Every Wardrobe",
      image: "https://img.freepik.com/premium-photo/modern-open-wardrobe-dressing-room-no-people-generative-ai_233473-1111.jpg?w=900",
      category: "Blog Post",
      link: "/blogPost",
    },
    {
      id: 3,
      title: "Summer Lookbook: Casual Chic",
      image: "https://img.freepik.com/free-photo/portrait-pretty-caucasian-woman-straw-hat-white-blouse-bali-style-bag-walking-tropical-garden_273443-220.jpg?t=st=1714495436~exp=1714499036~hmac=8508ab5bf99abbfabf0d1f22d9663a84b5f3b6a67d75b2abc0e34e5f3c32ac46&w=900",
      category: "Lookbook",
      link: "/lookbookContent",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Content
        </h2>
        <div className="flex flex-wrap justify-center -mx-4">
          {featuredContent.map((item) => (
            <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
              <div
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundColor: `var(--body-bg-color)` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span
                    className="text-xs uppercase font-semibold border py-1 px-2 rounded-full"
                    style={{
                      color: `var(--gray-color)`,
                      borderColor: `var(--text-color)`,
                    }}
                  >
                    {item.category}
                  </span>
                  <h3
                    className="text-xl font-semibold mt-2"
                    style={{ color: `var(--text-color)` }}
                  >
                    {item.title}
                  </h3>
                  <button className="mt-6">
                    <Link
                      to={item.link}
                      className="font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:opacity-90"
                      style={{
                        backgroundColor: `var(--highlight-color)`,
                        color: `var(--text-color)`,
                      }}
                    >
                      Read More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
