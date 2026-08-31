"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, UserCircle } from "lucide-react";

export default function LoginPage() {
  const { login, loginWithGoogle, enterGuestMode } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/todos");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      router.push("/todos");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google login gagal");
    }
  };

  const handleGuest = () => {
    enterGuestMode();
    router.push("/todos");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
              <span className="text-[13px] font-bold text-white">A</span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#0f172a]">Masuk ke Alflow</h1>
          <p className="mt-1 text-[14px] text-[#475569]">Atur tugas dan keuangan Anda</p>
        </div>
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-card">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-[13px] text-[#ef4444]">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#0f172a]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e8f0] py-2.5 pl-10 pr-3 text-[14px] focus:border-[#1597e5] focus:outline-none focus:ring-1 focus:ring-[#1597e5]"
                  placeholder="email@contoh.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#0f172a]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e8f0] py-2.5 pl-10 pr-10 text-[14px] focus:border-[#1597e5] focus:outline-none focus:ring-1 focus:ring-[#1597e5]"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[14px] font-semibold text-white disabled:opacity-50 transition-all"
              style={{ background: "#1597e5" }}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Masuk
                </>
              )}
            </button>
          </form>
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e2e8f0]" />
            <span className="text-[12px] text-[#94a3b8]">atau</span>
            <div className="h-px flex-1 bg-[#e2e8f0]" />
          </div>
          <button
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#f8fafc] transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            onClick={handleGuest}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#fde68a] bg-[#fffbeb] py-2.5 text-[14px] font-medium text-[#d97706] hover:bg-[#fef3c7] transition-colors"
          >
            <UserCircle className="h-4 w-4" /> Masuk sebagai Tamu
          </button>
        </div>
        <p className="mt-4 text-center text-[14px] text-[#475569]">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold" style={{ color: "#1597e5" }}>
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}