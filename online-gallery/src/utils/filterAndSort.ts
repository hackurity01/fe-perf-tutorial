import type { Product } from "../types/product";

export function filterAndSort(products: Product[], search: string) {
  return products
    .filter((product) => product.name.includes(search))
    .sort((a, b) => a.name.localeCompare(b.name));
}
