import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { reviewsData } from "../../constants/reviews";

const Reviews = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <h2 className="text-[35px] max-sm:text-[30px] font-bold mb-4 max-sm:-mb-4 text-gray-800 text-center">
        Customer Reviews
      </h2>
      <div className="m-10 max-sm:m-6">
        <Slider {...sliderSettings}>
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-[#ddd] rounded-md p-[15px] mb-10 max-sm:mb-3 max-md:h-[300px] relative"
            >
              <i className="absolute -top-4 left-0 text-[#00ADB5] text-3xl fa-solid fa-quote-left"></i>
              <div className="w-[100px] h-[100px] rounded-full border-2 border-[#00ADB5] ">
                <img src={review.image} alt="" className="rounded-full" />
              </div>
              <p className="font-semibold mt-3">{review.userName}</p>
              <div>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index} className="text-xl text-[#f39c12]">
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">{review.reviewText}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;