import { useState } from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <ProductList search={search} />
    </div>
  );
};

export default Home;
