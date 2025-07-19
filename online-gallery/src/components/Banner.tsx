function Banner() {
  const banner = "/event-banner.webp";

  return (
    <div className="w-full bg-[#1a2a3a] flex justify-center items-center mb-14 h-[500px]">
      <img src={banner} alt="Event Banner" className="block h-full" />
    </div>
  );
}

export default Banner;
