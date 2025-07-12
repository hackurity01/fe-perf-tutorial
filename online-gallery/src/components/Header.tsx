import React from "react";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => (
  <header className="flex flex-col items-center py-8">
    <h1 className="text-3xl font-bold mb-4">Online Gallery</h1>
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="상품을 검색하세요"
      className="rounded-full px-6 py-2 w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center shadow-sm transition"
    />
  </header>
);

export default Header;
