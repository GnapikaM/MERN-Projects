// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPosts, getPostsBySearch } from "../../../actions/posts.jsx";
// import { filterOptions, exploreOptions } from "../../../constants/index.js";
// import Post from "./sections/Post.jsx";
// import Pagination from "./sections/Pagination.jsx";
// import "../AllPosts/css/styles.css";
// import { useLocation, useNavigate } from "react-router-dom";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const AllPosts = ({ setCurrentId }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const query = useQuery();
//   const navigate = useNavigate();
//   const searchQuery = query.get("searchQuery");
//   const searchBy = query.get("searchBy") || "title";
//   const [search, setSearch] = useState("");
//   const [searchOption, setSearchOption] = useState("title");
//   const [isSearchOpen, setSearchOpen] = useState(false);

//   const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6);
//   const [currentFilter, setCurrentFilter] = useState("all");
//   const [currentExploreFilter, setCurrentExploreFilter] = useState("travel");

//   useEffect(() => {
//     dispatch(getPosts(currentPage, postsPerPage, currentFilter));
//   }, [dispatch, currentPage, postsPerPage, currentFilter]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleScroll = () => {
//     setScrollPosition(window.scrollY);
//   };

//   const handleFilterTabOpen = () => {
//     setFilterMenuOpen(true);
//   };

//   const handleFilterTabClose = () => {
//     setFilterMenuOpen(false);
//     setCurrentPage(1);
//   };

//   const handleFilterChange = (filter) => {
//     setCurrentFilter(filter);
//     setCurrentPage(1);
//     setFilterMenuOpen(false);
//   };

//   const handleExploreFilterChange = (filter) => {
//     setCurrentFilter(filter);
//     setCurrentPage(1);
//     setFilterMenuOpen(false);
//   };

//   const filterPosts = () => {
//     switch (currentFilter) {
//       case "popular":
//         return posts.filter((post) => post.likes.length > 10);
//       case "recent":
//         return posts.filter(
//           (post) =>
//             new Date().getTime() - new Date(post.createdAt).getTime() <
//             5 * 60 * 60 * 1000
//         );
//       case "Travel":
//       case "Tourism":
//       case "Adventure":
//       case "Food":
//         return posts.filter((post) => post.category === currentFilter);
//       default:
//         return posts;
//     }
//   };

//   const filteredPosts = filterPosts();
//   const sortedPosts = [...filteredPosts].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleSearchOptionChange = (e) => {
//     setSearchOption(e.target.value);
//   };

//   const handleSearch = () => {
//     const searchQueryObject =
//       searchOption === "tags"
//         ? { tags: search.split(",") }
//         : { search, tags: "" };
//     dispatch(getPostsBySearch(searchQueryObject, searchOption));
//   };

//   const handleKeyPressSearch = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-24">
//       {isFilterMenuOpen && (
//         <div
//           className={`fixed left-0 bottom-0 h-[90.2vh] w-[270px] bg-white z-40 animate-slideRight`}
//         >
//           <div
//             className="z-10 cursor-pointer text-3xl absolute right-2 top-2"
//             onClick={handleFilterTabClose}
//           >
//             <ion-icon name="close"></ion-icon>
//           </div>
//           <div className="mt-14">
//             <p className="mx-4 p-2 bg-gray-300">See Posts:</p>
//             <div className="flex gap-2 justify-center mt-3">
//               {filterOptions.map((option) => (
//                 <div
//                   key={option.value}
//                   className={`cursor-pointer px-4 py-1 ${
//                     currentFilter === option.value
//                       ? "bg-gray-300 border-[1px] border-black"
//                       : "border-[1px]"
//                   }`}
//                   onClick={() => handleFilterChange(option.value)}
//                 >
//                   {option.label}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="mt-14">
//             <p className="mx-4 p-2 bg-gray-300">Explore</p>
//             <div className="flex flex-wrap gap-2 justify-center mt-3">
//               {exploreOptions.map((option) => (
//                 <div
//                   key={option.value}
//                   className={`cursor-pointer px-4 py-1 ${
//                     currentFilter === option.value
//                       ? "bg-gray-300 border-[1px] border-black"
//                       : "border-[1px]"
//                   }`}
//                   onClick={() => handleExploreFilterChange(option.value)}
//                 >
//                   {option.label}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       <div
//         className={`bg-white flex items-center fixed top-0 right-0 left-0 w-full h-[67px] z-30 shadow-md transition-transform duration-200 ease-in-out transform ${
//           scrollPosition > 0 ? "translate-y-0" : "translate-y-full"
//         }`}
//       >
//         <div
//           onClick={handleFilterTabOpen}
//           className="cursor-pointer bg-white py-1 px-2 rounded-lg border-2 border-slate-500 absolute left-10 max-sm:left-2"
//         >
//           <ion-icon name="filter"></ion-icon>
//         </div>
//         <div
//           className="absolute right-0 p-2 m-1 text-xl cursor-pointer text-white rounded bg-[#393E46] sm:hidden"
//           onClick={() => setSearchOpen(!isSearchOpen)}
//         >
//           <ion-icon name="search"></ion-icon>
//         </div>
//         {isSearchOpen ? (
//           <div
//             className="absolute right-0 p-2 m-1 text-xl cursor-pointer text-white rounded bg-[#00ADB5] hover:bg-[#00acb594]"
//             onClick={(e) => setSearchOpen(!isSearchOpen)}
//           >
//             <ion-icon name="search"></ion-icon>
//           </div>
//         ) : (
//           <div className="absolute right-10 flex items-center max-sm:bg-white max-sm:w-full max-sm:py-2 max-sm:mr-0 mr-4 space-x-2 max-sm:top-16 max-sm:right-0">
//             <select
//               value={searchOption}
//               onChange={handleSearchOptionChange}
//               className="mr-2 max-sm:-mr-2 p-2 border border-gray-300 rounded"
//             >
//               <option className="h-[20px]" value="title">
//                 Title
//               </option>
//               <option className="" value="tags">
//                 Tags
//               </option>
//             </select>
//             <input
//               className="w-[300px] p-2 border border-gray-300 rounded outline-none max-sm:w-full"
//               type="text"
//               value={search}
//               onChange={handleSearchChange}
//               onKeyDown={handleKeyPressSearch}
//               placeholder="Search..."
//             />
//             <div
//               className="absolute right-0 p-2 m-1 text-xl cursor-pointer text-white rounded bg-[#00ADB5] hover:bg-[#00acb594]"
//               onClick={handleSearch}
//             >
//               <ion-icon name="search"></ion-icon>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentPosts.map((post) => (
//           <Post key={post._id} post={post} setCurrentId={setCurrentId} />
//         ))}
//       </div>
//       <div>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default AllPosts;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsBySearch } from "../../../actions/posts.jsx";
import { filterOptions, exploreOptions } from "../../../constants/index.js";
import Post from "./sections/Post.jsx";
import Pagination from "./sections/Pagination.jsx";
import "../AllPosts/css/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllPosts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");
  const searchBy = query.get("searchBy") || "title";
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [isSearchResultEmpty, setSearchResultEmpty] = useState(false);

  // useEffect(() => {
  //   dispatch(getPosts(currentPage, postsPerPage, currentFilter));
  // }, [dispatch, currentPage, postsPerPage, currentFilter]);

  useEffect(() => {
    if (search.trim() === "") {
      dispatch(getPosts(currentPage, postsPerPage, currentFilter));
    }
  }, [search, currentPage, postsPerPage, currentFilter, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const handleFilterTabOpen = () => {
    setFilterMenuOpen(true);
  };

  const handleFilterTabClose = () => {
    setFilterMenuOpen(false);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    setFilterMenuOpen(false);
  };

  const handleExploreFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    setFilterMenuOpen(false);
  };

  const filterPosts = () => {
    switch (currentFilter) {
      case "popular":
        return posts.filter((post) => post.likes.length > 10);
      case "recent":
        return posts.filter(
          (post) =>
            new Date().getTime() - new Date(post.createdAt).getTime() <
            5 * 60 * 60 * 1000
        );
      case "Travel":
      case "Tourism":
      case "Adventure":
      case "Food":
        return posts.filter((post) => post.category === currentFilter);
      default:
        return posts;
    }
  };

  const filteredPosts = filterPosts();
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  // const handleSearch = () => {
  //   const searchQueryObject =
  //     searchOption === "tags"
  //       ? { tags: search.split(",") }
  //       : { search, tags: "" };
  //   dispatch(getPostsBySearch(searchQueryObject, searchOption));
  // };

  const handleSearch = () => {
    // If the search input is empty, reset the search query and fetch all posts
    if (search.trim() === "") {
      dispatch(getPosts(currentPage, postsPerPage, currentFilter));
    } else {
      const searchQueryObject =
        searchOption === "tags"
          ? { tags: search.split(",") }
          : { search, tags: "" };
      dispatch(getPostsBySearch(searchQueryObject, searchOption));
    }
  };

  const handleKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-24">
      {isFilterMenuOpen && (
        <div
          className={`fixed left-0 bottom-0 h-[90.2vh] w-[270px] bg-white z-40 animate-slideRight`}
        >
          <div
            className="z-10 cursor-pointer text-3xl absolute right-2 top-2"
            onClick={handleFilterTabClose}
          >
            <ion-icon name="close"></ion-icon>
          </div>
          <div className="mt-14">
            <p className="mx-4 p-2 bg-gray-300">See Posts:</p>
            <div className="flex gap-2 justify-center mt-3">
              {filterOptions.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer px-4 py-1 ${
                    currentFilter === option.value
                      ? "bg-gray-300 border-[1px] border-black"
                      : "border-[1px]"
                  }`}
                  onClick={() => handleFilterChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14">
            <p className="mx-4 p-2 bg-gray-300">Explore</p>
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {exploreOptions.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer px-4 py-1 ${
                    currentFilter === option.value
                      ? "bg-gray-300 border-[1px] border-black"
                      : "border-[1px]"
                  }`}
                  onClick={() => handleExploreFilterChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div
        className={`bg-white flex items-center fixed top-0 right-0 left-0 w-full h-[67px] z-30 max-lg:-z-0 shadow-md transition-transform duration-200 ease-in-out transform ${
          scrollPosition > 0 ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          onClick={handleFilterTabOpen}
          className="cursor-pointer bg-white py-1 px-2 rounded-lg border-2 border-slate-500 absolute left-10 max-sm:left-2"
        >
          <ion-icon name="filter"></ion-icon>
        </div>
        <div
          className="absolute right-0 p-2 m-1 text-xl cursor-pointer text-white rounded bg-[#393E46] sm:hidden"
          onClick={() => setSearchOpen(!isSearchOpen)}
        >
          <ion-icon name="search"></ion-icon>
        </div>
        {isSearchOpen ? (
          <div
            className="absolute right-0 p-2 m-1 text-xl cursor-pointer text-white rounded bg-[#00ADB5] hover:bg-[#00acb594]"
            onClick={(e) => setSearchOpen(!isSearchOpen)}
          >
            <ion-icon name="search"></ion-icon>
          </div>
        ) : (
          <div className="absolute right-10 flex items-center max-sm:bg-white max-sm:w-full max-sm:py-2 max-sm:mr-0 mr-4 space-x-2 max-sm:top-16 max-sm:right-0">
            <select
              value={searchOption}
              onChange={handleSearchOptionChange}
              className="mr-2 max-sm:-mr-2 p-2 border border-gray-300 rounded"
            >
              <option className="h-[20px]" value="title">
                Title
              </option>
              <option className="" value="tags">
                Tags
              </option>
            </select>
            <input
              className="w-[300px] p-2 border border-gray-300 rounded outline-none max-sm:w-full"
              type="text"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPressSearch}
              placeholder="Search..."
            />
            <div
              className="absolute right-0 p-2 m-1 text-xl cursor-pointer text-white rounded bg-[#00ADB5] hover:bg-[#00acb594]"
              onClick={handleSearch}
            >
              <ion-icon name="search"></ion-icon>
            </div>
          </div>
        )}
      </div>
      <div className="max-lg:-z-10 my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {currentPosts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllPosts;
