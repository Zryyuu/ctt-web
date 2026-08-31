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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1597e5] border-t-transparent" />
      </div>
    );
  }

  if (!user && !isGuest) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/todos" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
              <span className="text-[11px] font-bold text-white">A</span>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-[#0f172a]">Alflow</span>
          </Link>
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[14px] font-medium transition-all ${
                    active
                      ? "bg-[#eaf7ff] text-[#1597e5]"
                      : "text-[#475569] hover:bg-[#f1f5f9]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[14px] text-[#475569]">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                isGuest ? "bg-[#fffbeb] text-[#f59e0b]" : "bg-[#eaf7ff] text-[#1597e5]"
              }`}>
                {isGuest ? <Smartphone className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <span className="hidden sm:inline">{displayName}</span>
              {isGuest && (
                <Link href="/login" className="hidden rounded-xl bg-[#1597e5] px-2.5 py-0.5 text-[12px] font-medium text-white hover:bg-[#1285cc] sm:inline">
                  Login
                </Link>
              )}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 rounded-xl px-2 py-1.5 text-[14px] text-[#94a3b8] hover:bg-red-50 hover:text-[#ef4444] transition-colors"
              title={isGuest ? "Keluar dari mode tamu" : "Logout"}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      {isGuest && (
        <div className="border-b border-[#fde68a] bg-[#fffbeb] px-4 py-2 text-center text-[13px] text-[#d97706]">
          Mode Tamu — Data tersimpan di browser ini saja. <Link href="/login" className="font-medium underline">Login</Link> untuk menyinkronkan ke cloud.
        </div>
      )}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}