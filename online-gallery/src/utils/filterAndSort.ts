import type { Product } from "../types/product";

export function filterAndSort(products: Product[], search: string) {
  performance.mark("start");
  // 1. 거대한 배열 복사를 여러번 수행 (더 많이!)
  let list = JSON.parse(JSON.stringify(products)); // deep clone
  list = JSON.parse(JSON.stringify(list)); // 한번 더 deep clone
  list = JSON.parse(JSON.stringify(list)); // 한번 더 deep clone
  list = JSON.parse(JSON.stringify(list)); // 한번 더 deep clone
  list = JSON.parse(JSON.stringify(list)); // 한번 더 deep clone
  list = JSON.parse(JSON.stringify(list)); // 한번 더 deep clone

  // 2. 불필요한 중첩 루프 추가
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < list.length; y++) {
      // 의미없는 계산
      Math.sqrt(Math.pow(list[y].price, 2));
    }
  }

  // 3. 버블 정렬 구현 (O(n^2)) - 더 느리게!
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      // 불필요한 문자열 변환 및 비교 (더 많이!)
      const nameA = list[j].name.toLocaleLowerCase().repeat(50);
      const nameB = list[j + 1].name.toLocaleLowerCase().repeat(50);

      // 추가적인 불필요한 계산
      for (let k = 0; k < 50; k++) {
        nameA.split("").reverse().join("");
        nameB.split("").reverse().join("");
      }

      if (nameA > nameB) {
        // 교환 시에도 불필요한 깊은 복사 (더 많이!)
        const temp = JSON.parse(JSON.stringify(list[j]));
        list[j] = JSON.parse(JSON.stringify(list[j + 1]));
        list[j + 1] = JSON.parse(JSON.stringify(temp));

        // 추가적인 불필요한 복사
        JSON.parse(JSON.stringify(list[j]));
        JSON.parse(JSON.stringify(list[j + 1]));
      }
    }
  }

  // 4. 검색어 필터링도 O(n^3)로 구현
  const result = list.filter((item: Product) => {
    let found = false;
    const searchLower = search.toLowerCase();
    if (searchLower === "") {
      return true;
    }

    // 삼중 중첩 루프로 더 느리게!
    for (let i = 0; i < item.name.length; i++) {
      for (let j = i; j < item.name.length; j++) {
        for (let k = 0; k < 20; k++) {
          // 불필요한 추가 루프
          const substr = item.name.slice(i, j + 1).toLowerCase();
          // 불필요한 정규식 처리
          substr.replace(/[a-z]/g, (match) =>
            match.toUpperCase().toLowerCase()
          );
          if (substr === searchLower) found = true;
        }
      }
    }

    // 추가적인 불필요한 처리
    item.name.split("").forEach((char) => {
      for (let m = 0; m < 5; m++) {
        char.repeat(3).toLowerCase().toUpperCase();
      }
    });

    return found;
  });

  // 5. 결과에 대한 추가적인 불필요한 처리
  result.forEach((item: Product) => {
    for (let n = 0; n < 10; n++) {
      JSON.parse(JSON.stringify(item));
      item.name.split("").reverse().join("").toLowerCase();
    }
  });

  return result;
}
