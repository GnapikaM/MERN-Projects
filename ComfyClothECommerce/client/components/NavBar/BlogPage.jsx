import React from "react";
import { useTheme } from "../NavLinks/Theme/ThemeContext";
import { ScrollToTop } from "../NavLinks/HomePage/Components";

const BlogPage = () => {
  const { theme } = useTheme();
  const blogPosts = [
    {
      id: 1,
      title: "10 Must-Have Wardrobe Essentials for Spring",
      date: "May 10, 2024",
      category: "Fashion",
      image:
        "https://img.freepik.com/premium-photo/modern-open-wardrobe-dressing-room-no-people-generative-ai_233473-1111.jpg?w=900",
      excerpt:
        "Get ready for spring with these essential pieces that will elevate your wardrobe.",
      readMore: "/blogPost",
    },
    {
      id: 2,
      title: "How to Style Denim Jackets for Any Occasion",
      date: "April 25, 2024",
      category: "Fashion",
      image:
        "https://img.freepik.com/free-photo/young-woman-with-headphones-walking_23-2148574705.jpg?t=st=1716476798~exp=1716480398~hmac=3428da67020a44175c848e989235a5058b6940114f0f2acd18d44a233165cec0&w=900",
      excerpt:
        "Discover versatile ways to wear denim jackets for casual outings or dressy events.",
      readMore: "/denimJacketStylingPage",
    },
    {
      id: 3,
      title: "Trend Alert: Sustainable Fashion Tips for Eco-Conscious Shoppers",
      date: "April 12, 2024",
      category: "Fashion",
      image:
        "https://img.freepik.com/free-photo/full-shot-people-garage-sale_23-2150661451.jpg?t=st=1716482707~exp=1716486307~hmac=be34b28c700ddce1fa1b64025a1dc0616280bcedf51342ec3d21e5af28cbebb4&w=900",
      excerpt:
        "Learn how to shop sustainably and reduce your carbon footprint while staying stylish.",
      readMore: "sustainableFashionPage",
    },
  ];

  return (
    <div
      className={`${
        theme === "dark" ? "dark-theme" : "light-theme"
      } flex justify-center items-center`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <ScrollToTop />
      <div className="pb-8 pt-32 max-[550px]:pt-40 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Latest Blog Posts
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <span
                    className="text-xs font-semibold uppercase"
                    style={{ color: `var(--highlight-color)` }}
                  >
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                  <p className="text-sm mt-1">{post.date}</p>
                  <p className="mt-3" style={{ color: `var(--gray-color)` }}>
                    {post.excerpt}
                  </p>
                  <a
                    href={post.readMore}
                    className="font-semibold mt-3 inline-block"
                    style={{ color: `var(--highlight-color)` }}
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
