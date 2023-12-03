import React, {useEffect} from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import qs from "qs";

import { categoryOptions } from "../../../../constants/index";

const FilterBy = ({ filterOption, setFilterOption }) => {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const selectedCategory = query.category;

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setFilterOption(selectedCategory);
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (filterOption === "popular") {
      setFilteredPosts(posts.filter((post) => post.likeCount > 10));
    } else if (filterOption === "recent") {
      setFilteredPosts(
        posts.filter(
          (post) => moment().diff(moment(post.createdAt), "hours") < 5
        )
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, filterOption]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className="p-4 my-6">
      <label className="mr-2">See posts:</label>
      <select
        value={filterOption}
        onChange={handleFilterChange}
        className="p-2 border border-coral-red rounded-md mr-[10px] border-none outline-none"
      >
        {categoryOptions.map((option) => (
          <option
            value={option.value}
            key={option.label}
            className="bg-white text-[#333] checked:bg-[#ddd] checked:text-[#333]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBy;
