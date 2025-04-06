import React from "react";
import BannerImg from "../../assets/2.png";

const Banner = () => {
  return (
    <>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* img section */}
          <div className="flex justify-center items-center">
            <img src={BannerImg} alt="" />
          </div>
          {/* text section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-semibold">Food Is Always Good</h1>
            <p className="py-5 font-semibold">
              We ensure food is always fresh, nutritious, and never wasted.
              Surplus meals are efficiently tracked and donated to local
              communities, promoting sustainability and social responsibility
              while enhancing student well-being through smart resource planning
              and AI-powered demand prediction.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
