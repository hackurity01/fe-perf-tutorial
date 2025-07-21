function PurchaseStatus() {
  // Purchase 데이터와 Refund 데이터가 번갈아 가면서 로드되는 기능 (여기서 다른 클로저 함수에 의해서 메모리릭 발생)
  // + 렌더링 최적화 실습을 위해 fetcher class 구현 (useEffect)

  return <div>PurchaseStatus</div>;
}

export default PurchaseStatus;
