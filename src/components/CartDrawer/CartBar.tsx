import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatRupees } from '../../utils/format';

export default function CartBar() {
  const { totalItems, itemTotal, restaurant } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0 || !restaurant) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 animate-slide-up sm:px-6">
      <button
        onClick={() => navigate('/cart')}
        className="flex w-full max-w-[900px] items-center justify-between rounded-xl bg-success px-5 py-4 text-white shadow-pop transition hover:brightness-105"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <ShoppingBag size={18} />
          {totalItems} item{totalItems > 1 ? 's' : ''} · {formatRupees(itemTotal)}
        </span>
        <span className="text-sm font-bold">View Cart →</span>
      </button>
    </div>
  );
}
