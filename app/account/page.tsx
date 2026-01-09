'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { BottomNav } from '@/components/layout/BottomNav';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
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

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="px-5 pt-4 pb-4 bg-white shadow-sm">
          <Skeleton variant="text" width={100} height={28} className="mx-auto" />
        </header>
        <main className="px-5 py-6 space-y-6">
          <Skeleton variant="rectangular" height={140} className="w-full rounded-3xl" />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0">
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width={20} height={20} />
              </div>
            ))}
          </div>
          <Skeleton variant="rectangular" height={56} className="w-full rounded-2xl" />
        </main>
        <BottomNav />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const menuItems = [
    { icon: '👤', label: 'Edit Profile', action: () => toast.success('Edit Profile coming soon') },
    { icon: '📍', label: 'My Addresses', action: () => router.push('/location') },
    { icon: '📦', label: 'My Orders', action: () => toast.success('My Orders coming soon') },
    { icon: '💳', label: 'Payment Methods', action: () => toast.success('Payment Methods coming soon') },
    { icon: '🎁', label: 'Promocodes', action: () => toast.success('Promocodes coming soon') },
    { icon: '⭐', label: 'Reviews', action: () => toast.success('Reviews coming soon') },
    { icon: '⚙️', label: 'Settings', action: () => toast.success('Settings coming soon') },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="px-5 pt-4 pb-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Account</h1>
      </header>

      <main className="px-5 py-6 space-y-6">
        {user ? (
          <>
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-[#53B175] to-[#45a065] rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-4 border-white/30">
                  {getInitials(user.username)}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{user.username}</h2>
                  <p className="text-sm text-white/90 mt-1">{user.email}</p>
                  <p className="text-sm text-white/80 mt-0.5">{user.phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="flex-1 text-left text-sm font-medium text-gray-900">{item.label}</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-red-500 text-white rounded-2xl font-semibold shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">You are not logged in</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 bg-[#53B175] text-white rounded-xl font-semibold hover:bg-[#45a065] transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

