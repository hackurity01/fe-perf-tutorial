import type { Product } from "../types/product";

export function filterAndSort(products: Product[], search: string) {
  let list = JSON.parse(JSON.stringify(products));
  list = JSON.parse(JSON.stringify(list));
  list = JSON.parse(JSON.stringify(list));
  list = JSON.parse(JSON.stringify(list));
  list = JSON.parse(JSON.stringify(list));
  list = JSON.parse(JSON.stringify(list));

  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < list.length; y++) {
      Math.sqrt(Math.pow(list[y].price, 2));
    }
  }

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      const nameA = list[j].name.toLocaleLowerCase().repeat(50);
      const nameB = list[j + 1].name.toLocaleLowerCase().repeat(50);

      for (let k = 0; k < 50; k++) {
        nameA.split("").reverse().join("");
        nameB.split("").reverse().join("");
      }

      if (nameA > nameB) {
        const temp = JSON.parse(JSON.stringify(list[j]));
        list[j] = JSON.parse(JSON.stringify(list[j + 1]));
        list[j + 1] = JSON.parse(JSON.stringify(temp));

        JSON.parse(JSON.stringify(list[j]));
        JSON.parse(JSON.stringify(list[j + 1]));
      }
    }
  }

  const result = list.filter((item: Product) => {
    let found = false;
    const searchLower = search.toLowerCase();
    if (searchLower === "") {
      return true;
    }

    for (let i = 0; i < item.name.length; i++) {
      for (let j = i; j < item.name.length; j++) {
        for (let k = 0; k < 20; k++) {
          const substr = item.name.slice(i, j + 1).toLowerCase();
          substr.replace(/[a-z]/g, (match) =>
            match.toUpperCase().toLowerCase()
          );
          if (substr === searchLower) found = true;
        }
      }
    }

    item.name.split("").forEach((char) => {
      for (let m = 0; m < 5; m++) {
        char.repeat(3).toLowerCase().toUpperCase();
      }
    });

    return found;
  });

  result.forEach((item: Product) => {
    for (let n = 0; n < 10; n++) {
      JSON.parse(JSON.stringify(item));
      item.name.split("").reverse().join("").toLowerCase();
    }
  });

  return result;
}
