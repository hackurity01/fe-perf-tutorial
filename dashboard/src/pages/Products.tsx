// TODO: 최적화 전
import React, { useState, useEffect } from "react";
import { products as mockProducts } from "@/data/mockData";
import ProductDrawer from "@/components/ProductDrawer";
import type { Product } from "@/components/ProductDrawer";

function fetchProducts(filter: { query: string }) {
  return new Promise<typeof mockProducts>((resolve) => {
    setTimeout(() => {
      let data = mockProducts;
      if (filter.query) {
        data = data.filter(
          (p) =>
            p.name.toLowerCase().includes(filter.query.toLowerCase()) ||
            p.description.toLowerCase().includes(filter.query.toLowerCase())
        );
      }
      resolve(data);
    }, 100);
  });
}

const Products: React.FC = () => {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<typeof mockProducts>([]);
  const [summary, setSummary] = useState({ total: 0, inStock: 0 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  // 수정 버튼 클릭 시
  const handleEdit = (id: number) => {
    setEditProductId(id);
    setDrawerOpen(true);
  };

  // 저장
  const handleSave = (updated: Product) => {
    setRows((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setDrawerOpen(false);
    setEditProductId(null);
  };

  // Drawer 닫기
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditProductId(null);
  };

  useEffect(() => {
    fetchProducts({ query }).then(setRows);
  }, [query]);

  useEffect(() => {
    fetchProducts({ query }).then((data) => {
      setSummary({
        total: data.length,
        inStock: data.filter((p) => p.stock > 0).length,
      });
    });
  }, [query]);

  return (
    <div
      className="mx-auto p-6 transition-all duration-300"
      style={{ marginRight: drawerOpen ? 320 : 0 }}>
      <h1 className="text-2xl font-bold mb-6">상품 목록</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 w-full md:w-64"
          placeholder="검색 (상품명, 설명)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <div className="bg-blue-100 text-blue-800 rounded px-3 py-2 text-sm">
            전체: <span className="font-bold">{summary.total}</span>
          </div>
          <div className="bg-green-100 text-green-800 rounded px-3 py-2 text-sm">
            재고 있음: <span className="font-bold">{summary.inStock}</span>
          </div>
        </div>
      </div>
      <div className="overflow-auto border rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left whitespace-nowrap">이미지</th>
              <th className="px-3 py-2 text-left">상품명</th>
              <th className="px-3 py-2 text-left">설명</th>
              <th className="px-3 py-2 text-left">가격</th>
              <th className="px-3 py-2 text-left">재고</th>
              <th className="px-3 py-2 text-left">수정</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="even:bg-gray-50">
                <td className="px-3 py-1 whitespace-nowrap">{p.id}</td>
                <td className="px-3 py-1 whitespace-nowrap">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-3 py-1 whitespace-nowrap">{p.name}</td>
                <td className="px-3 py-1 whitespace-nowrap">{p.description}</td>
                <td className="px-3 py-1 whitespace-nowrap">{p.price}</td>
                <td className="px-3 py-1 whitespace-nowrap">{p.stock}</td>
                <td className="px-3 py-1 whitespace-nowrap">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEdit(p.id)}>
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Drawer for edit */}
      <ProductDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        initialData={
          editProductId
            ? rows.find((p) => p.id === editProductId) || null
            : null
        }
        onSave={handleSave}
      />
      <p className="mt-4 text-xs text-gray-400">
        ※ 1,000개 상품 전체 렌더 (가상화 미적용)
      </p>
    </div>
  );
};

export default Products;
