'use client';

import { useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { BottomNav } from '@/components/layout/BottomNav';
import { CartItemSkeleton, Skeleton } from '@/components/ui/Skeleton';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function CartPage() {
  const router = useRouter();
  const { items, increment, decrement, removeItem, totalPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/login');
      return undefined;
    }
    if (isAuthenticated === true) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isAuthenticated, router]);
  const total = useMemo(() => totalPrice().toFixed(2), [items, totalPrice]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        <header className="px-5 pt-4 pb-4 bg-white shadow-sm border-b border-gray-100">
          <Skeleton variant="text" width={120} height={28} className="mx-auto" />
        </header>
        <main className="bg-white mt-4 pb-28">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </main>
        <div className="fixed bottom-20 left-0 right-0 px-5 z-10">
          <Skeleton variant="rectangular" height={56} className="w-full rounded-2xl" />
        </div>
        <BottomNav />
      </div>
    );
  }

  const handleIncrement = (productId: string, productName: string) => {
    increment(productId);
    toast.success(`${productName} added`);
  };

  const handleDecrement = (productId: string, productName: string) => {
    decrement(productId);
    toast.success(`${productName} removed`);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="px-5 pt-4 pb-4 bg-white shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center">My Cart</h1>
      </header>

      <main className="bg-white mt-4 pb-28">
        {items.length === 0 && (
          <div className="text-center text-gray-500 py-20">Your cart is empty</div>
        )}
        {items.length > 0 && (
          <div className="divide-y divide-gray-100">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="relative px-5 py-4 bg-gray-50 flex items-center gap-3 border-b border-gray-200"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveItem(product.id, product.name)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg"
                  aria-label="Remove item"
                >
                  ×
                </button>
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                      <button
                        type="button"
                        onClick={() => handleDecrement(product.id, product.name)}
                        className="px-3 py-1.5 text-gray-600 hover:text-gray-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(product.id, product.name)}
                        className="px-3 py-1.5 text-[#53B175] hover:text-[#45a065]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">${(product.price * quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {items.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-5 z-10">
          <button className="w-full bg-[#53B175] text-white rounded-2xl py-4 px-4 flex items-center justify-between font-semibold hover:bg-[#45a065] transition-colors">
            <span>Go to Checkout</span>
            <span className="bg-[#45a065] rounded-xl px-4 py-2 font-semibold">
              ${total}
            </span>
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

