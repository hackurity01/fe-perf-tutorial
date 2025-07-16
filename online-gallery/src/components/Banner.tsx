import React from "react";
import eventBanner from "../assets/event-banner.jpg";

const Banner: React.FC = () => (
  <div className="w-full bg-[#1a2a3a] flex justify-center items-center mb-14">
    <img
      src={eventBanner}
      alt="Event Banner"
      className="w-full max-w-[800px] object-cover object-center"
      style={{ display: "block" }}
    />
  </div>
);

export default Banner;
