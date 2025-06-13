import React from "react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col items-center p-4 w-72 m-2 transition hover:shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-56 h-56 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold mb-1 text-center line-clamp-1">
        {product.name}
      </h3>
      <div className="text-gray-500 text-sm mb-2 text-center line-clamp-2">
        {product.description}
      </div>
      <div className="font-bold text-xl text-gray-800 mb-3">
        {product.price.toLocaleString()}원
      </div>
      <button className="bg-gray-900 text-white rounded-md px-6 py-2 font-semibold text-base hover:bg-gray-700 transition">
        장바구니
      </button>
    </div>
  );
};

export default ProductCard;
