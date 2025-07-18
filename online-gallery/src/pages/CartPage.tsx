import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import Ad from "../components/Ad";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Ad />
          </div>
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Ad />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">장바구니</h2>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 font-medium transition-colors">
              전체 삭제
            </button>
          </div>

          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-600">
                총 상품 수:
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {cart.totalItems}개
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">
                총 결제금액:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(cart.totalPrice)}원
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors">
                쇼핑 계속하기
              </button>
              <button
                onClick={() => alert("주문이 완료되었습니다!")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
