export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User" | "Guest";
  address: string;
  age: number;
  reviewScore: number;
}

export interface ChartData {
  date: string;
  value: number;
}
