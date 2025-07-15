import { useState, useEffect } from "react";
import ProductDrawer from "@/components/ProductDrawer";
import type { Product } from "@/types";
import { sumBy } from "lodash";
import { getProducts } from "@/data/mockData";
import { useQuery } from "@tanstack/react-query";

function Products() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [summary, setSummary] = useState({ total: 0, inStock: 0 });

  const { data: rows = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", query],
    queryFn: () => getProducts({ query }),
  });

  useEffect(() => {
    if (!rows.length) return;

    setSummary({
      total: rows.length,
      inStock: sumBy(rows, (p: Product) => (p.stock > 0 ? 1 : 0)),
    });
  }, [rows]);

  // 수정 버튼 클릭 시
  const handleEdit = (id: number) => {
    setEditProductId(id);
    setDrawerOpen(true);
  };

  // 저장
  const handleSave = () => {
    // Normally, you would update the server and refetch, but for now just close the drawer
    setDrawerOpen(false);
    setEditProductId(null);
  };

  // Drawer 닫기
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditProductId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">상품 목록</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 w-full md:w-64"
          placeholder="검색 (상품명, 설명)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="text-gray-500 self-center">
          {isLoading
            ? "로딩 중..."
            : `총 ${summary.total}개, 재고 있음 ${summary.inStock}개`}
        </span>
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
    </div>
  );
}

export default Products;
