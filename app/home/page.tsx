'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProductCard } from '@/components/shop/ProductCard';
import { CategoryCard } from '@/components/shop/CategoryCard';
import { ProductCardSkeleton, CategoryCardSkeleton, Skeleton } from '@/components/ui/Skeleton';
import { useProductStore } from '@/store/productStore';
import { useLocationStore } from '@/store/locationStore';
import { useAuthStore } from '@/store/authStore';

interface CarouselBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const carouselBanners: CarouselBanner[] = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    subtitle: 'Get Up To 40% OFF',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: '2',
    title: 'Fresh Fruits',
    subtitle: 'Get Up To 30% OFF',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: '3',
    title: 'Organic Products',
    subtitle: 'Get Up To 25% OFF',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=400&q=60',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { products, categories, filteredProducts, setSearchTerm, searchTerm } = useProductStore();
  const { selectedZone } = useLocationStore();
  const { isAuthenticated } = useAuthStore();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/login');
      return undefined;
    }
    if (isAuthenticated === true) {
      // Small delay to show skeleton
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isAuthenticated, router]);

  const exclusive = products.filter((p) => p.isExclusive);
  const bestSelling = products.filter((p) => p.isBestSelling);
  const searchResults = filteredProducts();

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselBanners.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const displayLocation = () => {
    if (selectedZone) {
      return `Dhaka, ${selectedZone}`;
    }
    return 'Select Location';
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="px-5 pt-4 pb-6 bg-white shadow-sm">
          <div className="flex flex-col items-center mb-4">
            <Skeleton variant="circular" width={24} height={24} className="mb-2" />
            <Skeleton variant="text" width={120} height={16} />
          </div>
          <Skeleton variant="rectangular" height={44} className="w-full rounded-2xl" />
        </header>
        <main className="px-4 space-y-8 mt-4">
          <Skeleton variant="rectangular" height={100} className="w-full rounded-2xl" />
          <div className="space-y-3">
            <Skeleton variant="text" width={150} height={24} />
            <div className="grid grid-cols-2 gap-3">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton variant="text" width={150} height={24} />
            <div className="grid grid-cols-2 gap-3">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton variant="text" width={100} height={24} />
            <div className="grid grid-cols-2 gap-3">
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="px-5 pt-4 pb-6 bg-white shadow-sm">
        <div className="flex flex-col items-center mb-4">
          <div className="mb-2">
            <Image src="/assets/orangecarrot.png" alt="Logo" width={24} height={24} />
          </div>
          <Link href="/location" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <Image src="/assets/locicon.png" alt="Location icon" width={16} height={16} />
            <span>{displayLocation()}</span>
          </Link>
        </div>
        <div className="relative">
          <input
            className="w-full rounded-2xl bg-gray-100 px-4 py-3 pl-12 pr-10 text-sm text-gray-700 outline-none cursor-pointer"
            placeholder="Search Store"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Image src="/assets/searchicon.png" alt="Search icon" width={16} height={16} />
          </span>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <main className="px-4 space-y-8 mt-4">
        <section>
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
            >
              {carouselBanners.map((banner) => (
                <div
                  key={banner.id}
                  className="min-w-full bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      sizes="120px"
                      className="object-contain rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{banner.title}</h3>
                    <p className="text-sm text-[#53B175]">{banner.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {carouselBanners.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentCarouselIndex ? 'bg-[#53B175] w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentCarouselIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {searchTerm ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
              <span className="text-sm text-gray-500">{searchResults.length} found</span>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-sm text-gray-500">No products match your search.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Exclusive Offer</h2>
                <Link href="/explore" className="text-sm text-gray-500">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {exclusive.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Best Selling</h2>
                <Link href="/explore" className="text-sm text-gray-500">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {bestSelling.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        )}

        <section className="space-y-3 mb-6 pb-10">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard key={cat.id} id={cat.id} name={cat.name} icon={cat.icon} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

