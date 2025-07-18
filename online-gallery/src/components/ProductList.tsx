import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { slowFilterAndSort } from "../utils/slowFilterAndSort";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/products.json");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

interface ProductListProps {
  search: string;
}

function ProductList({ search }: ProductListProps) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return (
      <div className="text-center mt-10 text-red-500">
        상품을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const filteredProducts = slowFilterAndSort(products ?? [], search);

  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
