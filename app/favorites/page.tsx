'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { Skeleton } from '@/components/ui/Skeleton';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function FavoritesPage() {
  const router = useRouter();
  const { products, favorites } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const favoriteProducts = products.filter((p) => favorites.has(p.id));

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

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="px-5 pt-4 pb-4 bg-white shadow-sm">
          <Skeleton variant="text" width={120} height={28} className="mx-auto" />
        </header>
        <main className="bg-white mt-4">
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <Skeleton variant="rectangular" width={64} height={64} className="rounded-xl" />
                <div className="flex-1">
                  <Skeleton variant="text" width="70%" className="mb-2" />
                  <Skeleton variant="text" width="50%" />
                </div>
                <Skeleton variant="text" width={60} height={20} />
              </div>
            ))}
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const handleAddAllToCart = () => {
    favoriteProducts.forEach((product) => {
      addItem(product);
    });
    toast.success(`${favoriteProducts.length} items added to cart`);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="px-5 pt-4 pb-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Favorurite</h1>
      </header>

      <main className="bg-white mt-4">
        {favoriteProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No favourites yet</div>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {favoriteProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="px-5 py-4 pb-6">
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="w-full py-4 bg-[#53B175] text-white rounded-2xl font-semibold text-base shadow-lg hover:bg-[#45a065] transition-colors"
              >
                Add All To Cart
              </button>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

