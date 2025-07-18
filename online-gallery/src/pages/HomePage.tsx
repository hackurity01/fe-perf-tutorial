import { useState } from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header />
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="상품을 검색하세요"
          className="rounded-full px-6 py-2 w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center shadow-sm transition"
        />
      </div>
      <ProductList search={search} />
    </div>
  );
}

export default HomePage;
