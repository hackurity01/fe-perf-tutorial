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
  firstName: string;
  lastName: string;
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

export interface PurchaseStatus {
  id: number;
  name: string;
  price: number;
  discount: number;
  tax: number;
  shippingAddress: string;
  date: string;
  orderName: string;
  orderCountry: string;
  orderEmail: string;
  orderPhone: string;
  orderAddress: string;
  orderDate: string;
  orderStatus: "pending" | "approved" | "rejected";
}
