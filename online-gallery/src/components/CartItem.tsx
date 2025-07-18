import type { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
        <p className="text-gray-600 text-sm">{item.product.description}</p>
        <p className="text-blue-600 font-semibold">
          {formatPrice(item.product.price)}원
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))
          }
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
          -
        </button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-800">
          {formatPrice(item.product.price * item.quantity)}원
        </p>
        <button
          onClick={() => onRemove(item.product.id)}
          className="text-red-500 hover:text-red-600 text-sm transition-colors">
          삭제
        </button>
      </div>
    </div>
  );
}

export default CartItem;
