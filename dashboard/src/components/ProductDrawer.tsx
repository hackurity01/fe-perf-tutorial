import React, { useState } from "react";
import Drawer from "./Drawer";
import type { Product } from "@/types";

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  initialData: Product | null;
  onSave: (product: Product) => void;
  title?: string;
}

function ProductDrawer({
  open,
  onClose,
  initialData,
  onSave,
  title = "상품 수정",
}: ProductDrawerProps) {
  const [form, setForm] = useState<Product | null>(initialData);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) =>
      prev
        ? { ...prev, [name]: name === "stock" ? Number(value) : value }
        : prev
    );
  };

  const handleSave = () => {
    if (form) onSave(form);
  };

  if (!form) return null;

  return (
    <Drawer open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span>상품명</span>
          <input
            className="border rounded px-3 py-2"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>설명</span>
          <textarea
            className="border rounded px-3 py-2"
            name="description"
            value={form.description}
            onChange={handleFormChange}
            rows={3}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>가격</span>
          <input
            className="border rounded px-3 py-2"
            name="price"
            value={form.price}
            onChange={handleFormChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>재고</span>
          <input
            className="border rounded px-3 py-2"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleFormChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>이미지 URL</span>
          <input
            className="border rounded px-3 py-2"
            name="image"
            value={form.image}
            onChange={handleFormChange}
          />
        </label>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}>
          저장
        </button>
      </div>
    </Drawer>
  );
}

export default ProductDrawer;
