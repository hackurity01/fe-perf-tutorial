const EmptyCart = () => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-gray-600 mb-2">
        장바구니가 비어있습니다
      </h2>
      <p className="text-gray-500 mb-8">상품을 추가해보세요!</p>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        쇼핑 계속하기
      </button>
    </div>
  );
};

export default EmptyCart;
