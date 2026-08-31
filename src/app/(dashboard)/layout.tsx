"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LogOut, CheckSquare, Wallet, User, Smartphone } from "lucide-react";

const navItems = [
  { href: "/todos", label: "Tugas", icon: CheckSquare },
  { href: "/budget", label: "Keuangan", icon: Wallet },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isGuest, loading, logout, displayName } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !isGuest) router.replace("/login");
  }, [user, isGuest, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (!user && !isGuest) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/todos" className="text-xl font-bold text-indigo-600">Ctt</Link>
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                isGuest ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-600"
              }`}>
                {isGuest ? <Smartphone className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <span className="hidden sm:inline">{displayName}</span>
              {isGuest && (
                <Link href="/login" className="hidden rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-indigo-700 sm:inline">
                  Login
                </Link>
              )}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              title={isGuest ? "Keluar dari mode tamu" : "Logout"}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      {isGuest && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700">
          Mode Tamu - Data tersimpan di browser ini saja. <Link href="/login" className="font-medium underline">Login</Link> untuk sync ke cloud.
        </div>
      )}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
