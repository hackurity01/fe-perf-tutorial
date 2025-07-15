import { faker } from "@faker-js/faker";

export const users = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: ["Admin", "Manager", "User", "Guest"][i % 4],
  address: faker.location.streetAddress(),
  age: faker.number.int({ min: 20, max: 65 }),
  reviewScore: faker.number.int({ min: 0, max: 100 }),
}));

export const chartsData = Array.from({ length: 10000 }, (_, i) => ({
  date: new Date(2025, 0, 1 + (i % 365)).toISOString().slice(0, 10),
  value: Math.floor(Math.random() * 1000),
}));

export const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  stock: faker.number.int({ min: 0, max: 1000 }),
  image: faker.image.url(),
}));
