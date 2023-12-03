import React from "react";

const Categories = () => {
  return (
    <section className="pb-20 px-10 max-sm:px-4 max-sm:pb-6 max-sm:-mt-10">
      <div className="container mx-auto text-center">
        <h2 className="text-[35px] max-sm:text-[30px] font-bold mb-8 max-sm:mb-4">Discover the Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-sm:gap-2 text-gray-800">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 bg-slate-300 hover:bg-slate-200 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              <ion-icon
                name="airplane"
                class="text-3xl text-slate-700"
              ></ion-icon>
            </div>
            <h3 className="text-xl font-semibold mb-2">Diverse Locations</h3>
            <p className="text-gray-700 text-center">
              Explore memories and stories from a variety of locations, from
              bustling cities to serene landscapes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 bg-slate-300 hover:bg-slate-200 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              <ion-icon name="camera" class="text-3xl text-slate-700"></ion-icon>
            </div>
            <h3 className="text-xl font-semibold mb-2">Captivating Photos</h3>
            <p className="text-gray-700 text-center">
              Explore diverse locations through virtual journeys shared by
              creators, unraveling their exciting adventures.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 bg-slate-300 hover:bg-slate-200 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              <ion-icon name="restaurant" class="text-3xl text-slate-700"></ion-icon>
            </div>
            <h3 className="text-xl font-semibold mb-2">Culinary Delights</h3>
            <p className="text-gray-700 text-center">
              Immerse yourself in captivating visual narratives through stunning
              photos shared by our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
