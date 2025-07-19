import { useQuery } from "@tanstack/react-query";

const fetchBanner = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const res = await fetch("/api/banner.json");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

function Banner() {
  const { data: banner } = useQuery({
    queryKey: ["banner"],
    queryFn: fetchBanner,
  });

  if (!banner) return null;

  return (
    <div className="w-full bg-[#1a2a3a] flex justify-center items-center mb-14">
      <img
        src={banner?.banner}
        alt="Event Banner"
        className="block w-full max-w-[800px]"
      />
    </div>
  );
}

export default Banner;
