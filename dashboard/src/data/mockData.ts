import type { Product, User, ChartData, PurchaseStatus } from "@/types";
import { faker } from "@faker-js/faker";

export const getUsers = (): Promise<User[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Network] getUsers");
      resolve(
        Array.from({ length: 1000 }, (_, i) => ({
          id: i + 1,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: ["Admin", "Manager", "User", "Guest"][i % 4] as User["role"],
          address: faker.location.streetAddress(),
          age: faker.number.int({ min: 20, max: 65 }),
          reviewScore: faker.number.int({ min: 0, max: 100 }),
        }))
      );
    }, 300);
  });

export const getChartsData = (): Promise<ChartData[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Network] getChartsData");
      resolve(
        Array.from({ length: 10000 }, (_, i) => ({
          date: new Date(2025, 0, 1 + (i % 365)).toISOString().slice(0, 10),
          value: Math.floor(Math.random() * 1000),
        }))
      );
    }, 300);
  });

export const getProducts = ({ query }: { query: string }): Promise<Product[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Network] getProducts");
      let data = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        stock: faker.number.int({ min: 0, max: 1000 }),
        image: faker.image.url(),
      }));
      if (query) {
        data = data.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      resolve(data);
    }, 300);
  });

export const getRealTimePurchaseStatus = (): Promise<PurchaseStatus[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Network] getRealTimePurchaseStatus");
      const data = Array.from(
        { length: Math.floor(Math.random() * 40) + 60 },
        (_, i) => ({
          id: i + 1,
          name: faker.commerce.productName(),
          price: Number(faker.commerce.price()),
          discount: Number(faker.commerce.price()),
          tax: Number(faker.commerce.price()),
          shippingAddress: faker.location.streetAddress(),
          date: faker.date.recent().toISOString().slice(0, 10),
          orderName: faker.person.firstName(),
          orderCountry: faker.location.country(),
          orderEmail: faker.internet.email(),
          orderPhone: faker.phone.number(),
          orderAddress: faker.location.streetAddress(),
          orderDate: faker.date.recent().toISOString().slice(0, 10),
          orderStatus: ["pending", "approved", "rejected"][
            Math.floor(Math.random() * 3)
          ] as PurchaseStatus["orderStatus"],
        })
      );
      resolve(data);
    }, 300);
  });

export const getRealTimeRefundStatus = (): Promise<PurchaseStatus[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Network] getRealTimeRefundStatus");
      const data = Array.from(
        { length: Math.floor(Math.random() * 40) + 60 },
        (_, i) => ({
          id: i + 1,
          name: faker.commerce.productName(),
          price: Number(faker.commerce.price()),
          discount: Number(faker.commerce.price()),
          tax: Number(faker.commerce.price()),
          shippingAddress: faker.location.streetAddress(),
          date: faker.date.recent().toISOString().slice(0, 10),
          orderName: faker.person.firstName(),
          orderCountry: faker.location.country(),
          orderEmail: faker.internet.email(),
          orderPhone: faker.phone.number(),
          orderAddress: faker.location.streetAddress(),
          orderDate: faker.date.recent().toISOString().slice(0, 10),
          orderStatus: ["pending", "approved", "rejected"][
            Math.floor(Math.random() * 3)
          ] as PurchaseStatus["orderStatus"],
        })
      );
      resolve(data);
    }, 300);
  });
