"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2, ListTodo, Wallet, PiggyBank, Download,
  BarChart3, Target, Repeat, ArrowRight, Github,
  ClipboardCheck, PieChart, Sparkles, Shield, Zap, Globe,
  ChevronRight, Menu, X, ArrowUpRight, TrendingDown, Clock,
  Star, Heart, ArrowUpCircle, ArrowDownCircle,
} from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">

      {/* ────────── NAV ────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#e2e8f0]/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
              <span className="text-[11px] font-bold text-white">A</span>
            </div>
            <span className="text-[15px] font-bold tracking-tight">Alflow</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#apa" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">Fitur</a>
            <a href="#cara" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">Cara Kerja</a>
            <a href="#detail" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">Detail</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-[14px] font-medium text-[#64748b] hover:text-[#0f172a] transition-colors">Masuk</Link>
            <Link href="/login" className="rounded-[12px] bg-[#1597e5] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#1285cc] transition-all">
              Mulai Gratis
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9] md:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#e2e8f0] bg-white px-5 py-4 md:hidden">
            <div className="space-y-3">
              <a href="#apa" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Fitur</a>
              <a href="#cara" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Cara Kerja</a>
              <a href="#detail" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Detail</a>
              <Link href="/login" className="block rounded-[12px] bg-[#1597e5] px-5 py-2.5 text-center text-[14px] font-semibold text-white">Mulai Gratis</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ────────── HERO ────────── */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[.06] blur-3xl" style={{ background: "radial-gradient(ellipse, #65c4ff, transparent 70%)" }} />
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Animate>
              <div className="max-w-xl">
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1 text-[12px] font-medium text-[#64748b]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  v2.0 — Anggaran & Transaksi Berulang
                </span>
                <h1 className="text-[32px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]">
                  Uang keluar, tugas numpuk,<br />
                  hidup makin <span className="relative inline-block">
                    <span style={{ color: "#1597e5" }}>kacau</span>
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5C40 2 80 1 100 3s60 3 99-1" stroke="#65c4ff" strokeWidth="2.5" strokeLinecap="round" opacity=".5"/></svg>
                  </span>?
                </h1>
                <p className="mt-5 text-[16px] leading-[1.65] text-[#64748b]">
                  Alflow bantu kamu urus semua dari satu tempat. Catat pengeluaran, atur deadline, sampai pantau tabungan — tanpa harus buka lima app berbeda.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-[12px] bg-[#1597e5] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#1285cc] transition-all" style={{ boxShadow: "0 12px 35px rgba(101,196,255,.22)" }}>
                    Coba Gratis <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="#apa" className="inline-flex items-center gap-2 rounded-[12px] border border-[#e2e8f0] bg-white px-6 py-3 text-[15px] font-medium text-[#475569] hover:border-[#cbd5e1] transition-all">
                    Lihat Fitur
                  </a>
                </div>
              </div>
            </Animate>

            <Animate delay={0.12} className="relative hidden lg:block">
              {/* Dashboard preview */}
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                <div className="flex items-center gap-1.5 mb-5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard label="Saldo" val="Rp5.3Jt" accent="#1597e5" bg="#eaf7ff" />
                  <MetricCard label="Pemasukan" val="+Rp8.5Jt" accent="#10b981" bg="#ecfdf5" />
                  <MetricCard label="Pengeluaran" val="−Rp3.2Jt" accent="#ef4444" bg="#fef2f2" />
                </div>
                <div className="space-y-2">
                  <TxLine name="Gaji Bulanan" cat="Gaji" amt="+Rp5.000.000" color="#10b981" />
                  <TxLine name="Sewa Kos" cat="Tagihan" amt="−Rp1.200.000" color="#ef4444" />
                  <TxLine name="Groceries" cat="Makanan" amt="−Rp450.000" color="#ef4444" />
                  <TxLine name="Transport" cat="Transport" amt="−Rp180.000" color="#ef4444" />
                </div>
              </div>

              {/* Floating cards */}
              <FloatCard className="absolute -left-8 top-6" delay={0.5}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ecfdf5]"><TrendingDown className="h-3.5 w-3.5 text-[#10b981]" /></div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f172a]">+ Rp5.000.000</p>
                  <p className="text-[11px] text-[#94a3b8]">Gaji masuk hari ini</p>
                </div>
              </FloatCard>
              <FloatCard className="absolute -right-6 top-24" delay={0.65}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf7ff]"><CheckCircle2 className="h-3.5 w-3.5 text-[#1597e5]" /></div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f172a]">3 tugas selesai</p>
                  <p className="text-[11px] text-[#94a3b8]">Hari ini</p>
                </div>
              </FloatCard>
              <FloatCard className="absolute -right-4 bottom-6" delay={0.8}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fef2f2]"><Target className="h-3.5 w-3.5 text-[#ef4444]" /></div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f172a]">Budget 72%</p>
                  <p className="text-[11px] text-[#94a3b8]">Makanan mendekati batas</p>
                </div>
              </FloatCard>
            </Animate>
          </div>
        </div>
      </section>

      {/* ────────── STAT STRIP ────────── */}
      <section className="border-y border-[#e2e8f0]/60 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { n: "2.400+", l: "Transaksi tercatat" },
              { n: "180+", l: "Tugas selesai" },
              { n: "98%", l: "Budget terpantau" },
              { n: "100%", l: "Gratis" },
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-[22px] font-bold tracking-tight text-[#0f172a]">{s.n}</p>
                <p className="text-[13px] text-[#94a3b8]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── "KENAPA" SECTION ────────── */}
      <section id="apa" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#1597e5] mb-3">Kenapa Alflow?</p>
              <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[36px] leading-[1.15]">Kamu butuh satu tempat<br className="hidden sm:block" /> buat atur semuanya.</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[#64748b]">Bukan todo list biasa, bukan app keuangan biasa. Alflow gabungin keduanya — jadi kamu ga perlu lompat-lompat.</p>
            </div>
          </Animate>

          {/* Bento grid — ga semua sama ukurannya */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Large card — Task */}
            <Animate delay={0} className="sm:col-span-2 lg:col-span-2 rounded-[20px] border border-[#e2e8f0] bg-white overflow-hidden hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] transition-all hover:-translate-y-0.5">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eaf7ff] text-[#1597e5]"><ListTodo className="h-5 w-5" /></div>
                  <h3 className="text-[17px] font-semibold">Catatan Tugas</h3>
                </div>
                <p className="text-[14px] text-[#64748b] leading-relaxed mb-5">Buat tugas, bagi jadi subtask, set prioritas & deadline. Kalau ada yang terlambat, langsung keliatan.</p>
              </div>
              <div className="mx-5 mb-5 rounded-[14px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
                <div className="space-y-2.5">
                  <TaskItem text="Kirim laporan bulanan" p="Tinggi" state="active" />
                  <TaskItem text="Review desain UI v2" p="Sedang" state="active" />
                  <TaskItem text="Bayar internet" p="Tinggi" state="overdue" />
                  <TaskItem text="Backup file project" p="Rendah" state="done" />
                </div>
              </div>
            </Animate>

            {/* Large card — Finance */}
            <Animate delay={0.08} className="sm:col-span-2 lg:col-span-1 rounded-[20px] border border-[#e2e8f0] bg-white overflow-hidden hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] transition-all hover:-translate-y-0.5">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#ecfdf5] text-[#10b981]"><Wallet className="h-5 w-5" /></div>
                  <h3 className="text-[17px] font-semibold">Keuangan Jelas</h3>
                </div>
                <p className="text-[14px] text-[#64748b] leading-relaxed mb-5">Pemasukan, pengeluaran, saldo — semua keliatan dalam satu pandangan.</p>
              </div>
              <div className="mx-5 mb-5 rounded-[14px] border border-[#e2e8f0] bg-[#f8fafc] p-4 space-y-2.5">
                <MiniTx name="Gaji" amt="+Rp5.000.000" c="#10b981" />
                <MiniTx name="Kos" amt="−Rp1.200.000" c="#ef4444" />
                <MiniTx name="Makan" amt="−Rp450.000" c="#ef4444" />
              </div>
            </Animate>

            {/* Budget */}
            <Animate delay={0.12} className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#fff7ed] text-[#f59e0b] mb-3"><Target className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold mb-1.5">Batas Anggaran</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed mb-4">Tetapin limit per kategori. Kalau udah mulai deket batas, Alflow kasih tau.</p>
              <div className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-3.5">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-medium text-[#0f172a]">Makanan</span>
                  <span className="font-semibold text-[#f59e0b]">72%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
                  <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: "72%" }} />
                </div>
                <p className="text-[12px] text-[#94a3b8] mt-1.5">Rp720.000 / Rp1.000.000</p>
              </div>
            </Animate>

            {/* Savings */}
            <Animate delay={0.16} className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#10b981] mb-3"><PiggyBank className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold mb-1.5">Target Tabungan</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed mb-4">Bikin rencana nabung, set target & deadline. Progress bar-nya bikin termotivasi.</p>
              <div className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-3.5">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-medium text-[#0f172a]">Dana Darurat</span>
                  <span className="font-semibold text-[#1597e5]">65%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1597e5]" style={{ width: "65%" }} />
                </div>
                <p className="text-[12px] text-[#94a3b8] mt-1.5">45 hari lagi · Rp72.222/hari</p>
              </div>
            </Animate>

            {/* Recurring */}
            <Animate delay={0.2} className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#faf5ff] text-[#8b5cf6] mb-3"><Repeat className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold mb-1.5">Transaksi Berulang</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed">Gaji bulanan, bayar kos, langganan — atur otomatis, ga perlu input manual tiap bulan.</p>
            </Animate>

            {/* Recap */}
            <Animate delay={0.24} className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eff6ff] text-[#3b82f6] mb-3"><PieChart className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold mb-1.5">Rekap Bulanan</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed">Lihat pie chart pengeluaran per kategori. Tahu persis uangmu habis buat apa aja.</p>
            </Animate>
          </div>
        </div>
      </section>

      {/* ────────── HOW IT WORKS ────────── */}
      <section id="cara" className="border-y border-[#e2e8f0]/60 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="text-center mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#1597e5] mb-3">Cara Kerja</p>
              <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[36px]">Mulai dari hal sederhana.</h2>
            </div>
          </Animate>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { n: "01", t: "Pilih cara masuk", d: "Daftar pakai email atau Google. Atau langsung coba sebagai tamu — ga perlu daftar." },
              { n: "02", t: "Catat aktivitas", d: "Tambah tugas, catat transaksi, atau bikin rencana tabungan baru." },
              { n: "03", t: "Atur batas", d: "Set budget per kategori dan deadline tiap tugas. Biar ada yang nge-push." },
              { n: "04", t: "Pantau terus", d: "Cek rekap bulanan, lihat grafik, dan pastikan semuanya on track." },
            ].map((s, i) => (
              <Animate key={s.n} delay={i * 0.08}>
                <div className="relative">
                  <span className="text-[48px] font-extrabold text-[#eaf7ff] leading-none">{s.n}</span>
                  <h3 className="mt-2 text-[16px] font-semibold text-[#0f172a]">{s.t}</h3>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[#64748b]">{s.d}</p>
                  {i < 3 && <ChevronRight className="absolute right-0 top-7 hidden h-4 w-4 text-[#cbd5e1] lg:block" />}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── FEATURE DEEP DIVES (alternating) ────────── */}
      <section id="detail" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 space-y-28">

          {/* Tasks */}
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#1597e5] mb-3">Task Management</p>
                <h3 className="text-[24px] font-bold tracking-[-0.01em] sm:text-[30px] leading-[1.15]">Tugas yang jelas,<br />ga perlu mikir dua kali.</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Mulai dari yang kecil — "beli kopi" — sampai yang gede — "selesaiin proposal". Alflow bantu kamu urutin mana yang harus dikerjain dulu, mana yang bisa nunggu.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {["Subtask buat pecah jadi bagian kecil", "Prioritas: rendah, sedang, tinggi", "Deadline yang keliatan jelas"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-[14px] text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1597e5]" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                <div className="space-y-2.5">
                  <TaskItem text="Selesaikan laporan Q2" p="Tinggi" state="active" />
                  <TaskItem text="Riset kompetitor" p="Sedang" state="active" />
                  <TaskItem text="Meeting jam 3 sore" p="Tinggi" state="overdue" />
                  <TaskItem text="Update README" p="Rendah" state="done" />
                  <TaskItem text="Deploy staging" p="Sedang" state="active" />
                </div>
              </div>
            </div>
          </Animate>

          {/* Finance */}
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1 rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard label="Saldo" val="Rp5.3Jt" accent="#1597e5" bg="#eaf7ff" />
                  <MetricCard label="Masuk" val="+Rp8.5Jt" accent="#10b981" bg="#ecfdf5" />
                  <MetricCard label="Keluar" val="−Rp3.2Jt" accent="#ef4444" bg="#fef2f2" />
                </div>
                <div className="space-y-2">
                  <TxLine name="Gaji Bulanan" cat="Gaji" amt="+Rp5.000.000" color="#10b981" />
                  <TxLine name="Sewa Kos" cat="Tagihan" amt="−Rp1.200.000" color="#ef4444" />
                  <TxLine name="Groceries" cat="Makanan" amt="−Rp450.000" color="#ef4444" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#1597e5] mb-3">Personal Finance</p>
                <h3 className="text-[24px] font-bold tracking-[-0.01em] sm:text-[30px] leading-[1.15]">Uang masuk keluar,<br />semua keliatan.</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Ga perlu lagi nebak-nebak sisa saldo di akhir bulan. Catat tiap transaksi, pilih kategori yang pas, dan biarkan Alflow ngitung semuanya buat kamu.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {["Kategori: Makanan, Transport, Tagihan, dll.", "Pie chart distribusi pengeluaran", "Rekap per bulan yang bisa di-scroll"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-[14px] text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1597e5]" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Animate>

          {/* Savings + Budget */}
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#1597e5] mb-3">Savings & Budget</p>
                <h3 className="text-[24px] font-bold tracking-[-0.01em] sm:text-[30px] leading-[1.15]">Nabung ada target,<br />belanja ada batas.</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Bikin rencana nabung buat liburan, dana darurat, atau gadget baru. Atur juga budget bulanan per kategori — biar ga kebablasan.
                </p>
                <div className="mt-5 space-y-3">
                  <BudgetBar cat="Makanan" used="Rp720K" total="Rp1Jt" pct={72} />
                  <BudgetBar cat="Transport" used="Rp350K" total="Rp500K" pct={70} />
                  <BudgetBar cat="Hiburan" used="Rp120K" total="Rp300K" pct={40} />
                </div>
              </div>
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Rencana Tabungan</p>
                <div className="rounded-[14px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-[15px] font-semibold text-[#0f172a]">Dana Darurat</p>
                      <p className="text-[13px] text-[#94a3b8]">Target Rp10.000.000</p>
                    </div>
                    <span className="rounded-[8px] bg-[#eaf7ff] px-2.5 py-1 text-[12px] font-bold text-[#1597e5]">65%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden">
                    <div className="h-full rounded-full bg-[#1597e5]" style={{ width: "65%" }} />
                  </div>
                  <p className="text-[12px] text-[#94a3b8] mt-2">45 hari lagi · Rp72.222/hari</p>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── FINAL CTA ────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16" style={{ background: "linear-gradient(135deg, #65c4ff 0%, #1597e5 100%)" }}>
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-15 blur-3xl bg-white" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full opacity-10 blur-3xl bg-white" />
              <h2 className="relative text-[28px] font-bold tracking-[-0.01em] text-white sm:text-[36px]">Siap bikin hidup lebih teratur?</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[16px] text-white/80 leading-relaxed">
                Mulai dari sekarang. Gratis, tanpa kartu kredit, dan bisa langsung dipake tanpa daftar.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-[12px] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#1597e5] hover:bg-white/90 transition-all" style={{ boxShadow: "0 8px 30px rgba(0,0,0,.1)" }}>
                  Mulai Gratis <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[12px] border border-white/30 px-7 py-3.5 text-[15px] font-medium text-white hover:bg-white/10 transition-all">
                  <Download className="h-4 w-4" /> Download APK
                </a>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <footer className="border-t border-[#e2e8f0]/60 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
                  <span className="text-[11px] font-bold text-white">A</span>
                </div>
                <span className="text-[15px] font-bold tracking-tight">Alflow</span>
              </div>
              <p className="mt-2.5 max-w-xs text-[14px] leading-relaxed text-[#64748b]">Atur tugas. Kelola uang. Jalani hari dengan lebih terarah.</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Product</p>
              <ul className="space-y-2">
                {["Tugas", "Keuangan", "Anggaran", "Tabungan", "Rekap"].map(t => (
                  <li key={t}><a href="#apa" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Resources</p>
              <ul className="space-y-2">
                {["Cara Kerja", "Dokumentasi", "Update"].map(t => (
                  <li key={t}><a href="#cara" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Project</p>
              <ul className="space-y-2">
                <li><a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors"><Github className="h-3.5 w-3.5" /> GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[#e2e8f0]/60 pt-5 text-center text-[13px] text-[#94a3b8]">
            © 2026 Alflow. Built with care.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Shared tiny components ─── */

function MetricCard({ label, val, accent, bg }: { label: string; val: string; accent: string; bg: string }) {
  return (
    <div className="rounded-[12px] p-3" style={{ background: bg }}>
      <p className="text-[11px] font-medium text-[#94a3b8]">{label}</p>
      <p className="text-[16px] font-bold tabular-nums mt-0.5" style={{ color: accent }}>{val}</p>
    </div>
  );
}

function TxLine({ name, cat, amt, color }: { name: string; cat: string; amt: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] bg-[#f8fafc] px-3.5 py-2.5">
      <div>
        <p className="text-[13px] font-medium text-[#0f172a]">{name}</p>
        <p className="text-[11px] text-[#94a3b8]">{cat}</p>
      </div>
      <span className="text-[13px] font-bold tabular-nums" style={{ color }}>{amt}</span>
    </div>
  );
}

function MiniTx({ name, amt, c }: { name: string; amt: string; c: string }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] bg-[#f1f5f9] px-3 py-2.5">
      <span className="text-[13px] font-medium text-[#0f172a]">{name}</span>
      <span className="text-[13px] font-bold tabular-nums" style={{ color: c }}>{amt}</span>
    </div>
  );
}

function FloatCard({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`rounded-[14px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 shadow-[0_8px_30px_rgba(15,23,42,.06)] flex items-center gap-2.5 ${className || ""}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: `opacity 0.35s ease ${delay || 0}s, transform 0.35s ease ${delay || 0}s` }}>
      {children}
    </div>
  );
}

function TaskItem({ text, p, state }: { text: string; p: string; state: "active" | "overdue" | "done" }) {
  const pc = p === "Tinggi" ? "#ef4444" : p === "Sedang" ? "#f59e0b" : "#10b981";
  return (
    <div className={`flex items-center gap-3 rounded-[12px] border px-3.5 py-2.5 ${
      state === "overdue" ? "border-red-200 bg-red-50/60" : state === "done" ? "border-[#e2e8f0] bg-[#f8fafc] opacity-55" : "border-[#e2e8f0] bg-white"
    }`}>
      <div className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        state === "done" ? "border-[#10b981] bg-[#10b981]" : "border-[#d1d5db]"
      }`}>
        {state === "done" && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
      </div>
      <p className={`flex-1 text-[13px] font-medium ${
        state === "done" ? "text-[#94a3b8] line-through" : state === "overdue" ? "text-[#ef4444]" : "text-[#0f172a]"
      }`}>{text}</p>
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{
        background: state === "overdue" ? "#fef2f2" : state === "done" ? "#f1f5f9" : `${pc}12`,
        color: state === "overdue" ? "#ef4444" : state === "done" ? "#94a3b8" : pc,
      }}>
        {state === "overdue" ? "Terlambat" : state === "done" ? "Selesai" : p}
      </span>
    </div>
  );
}

function BudgetBar({ cat, used, total, pct }: { cat: string; used: string; total: string; pct: number }) {
  const c = pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#1597e5";
  return (
    <div className="rounded-[12px] border border-[#e2e8f0] bg-white p-3.5">
      <div className="flex items-center justify-between text-[13px] mb-1.5">
        <span className="font-medium text-[#0f172a]">{cat}</span>
        <span className="font-semibold tabular-nums" style={{ color: c }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
      </div>
      <p className="text-[12px] text-[#94a3b8] mt-1.5">{used} / {total}</p>
    </div>
  );
}