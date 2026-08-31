"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2, ListTodo, Wallet, PiggyBank, Download,
  BarChart3, Target, Repeat, ArrowRight, Github,
  ClipboardCheck, PieChart, Sparkles, Shield, Zap, Globe,
  Smartphone, TrendingUp, CalendarCheck, Bell, Layers,
  ChevronRight, Star, Menu, X, ArrowUpRight, TrendingDown,
} from "lucide-react";

const FEATURES = [
  { icon: ListTodo, title: "Task Management", desc: "Tugas dengan subtask, prioritas, deadline, dan catatan. Semua terorganisir dalam satu alur.", large: true },
  { icon: Wallet, title: "Financial Overview", desc: "Pantau pemasukan & pengeluaran dengan grafik kategori yang jelas.", large: true },
  { icon: Target, title: "Budget Control", desc: "Tetapkan batas pengeluaran per kategori per bulan. Peringatan otomatis saat terlampaui.", large: false },
  { icon: PiggyBank, title: "Savings Goals", desc: "Rencanakan target tabungan, atur deadline, lihat progress bar.", large: false },
  { icon: Repeat, title: "Recurring Transactions", desc: "Gaji bulanan, tagihan rutin — otomatis diingatkan.", large: false },
  { icon: PieChart, title: "Monthly Recap", desc: "Ringkasan keuangan per bulan dengan pie chart & perbandingan.", large: false },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Pilih cara masuk", desc: "Masuk dengan akun atau gunakan mode tamu." },
  { num: "02", title: "Atur aktivitas", desc: "Tambahkan tugas, transaksi, atau target tabungan." },
  { num: "03", title: "Tetapkan batas", desc: "Atur budget dan deadline agar semuanya tetap terkendali." },
  { num: "04", title: "Lihat progres", desc: "Pantau pekerjaan dan kondisi keuangan melalui dashboard." },
];

function useInView(threshold = 0.12) {
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

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-[#eaf7ff] selection:text-[#0878c5]">

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#e2e8f0] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
              <span className="text-[11px] font-bold text-white">A</span>
            </div>
            <span className="text-[15px] font-bold tracking-tight">Alflow</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-[14px] font-medium text-[#475569] transition-colors hover:text-[#0f172a]">Features</a>
            <a href="#how-it-works" className="text-[14px] font-medium text-[#475569] transition-colors hover:text-[#0f172a]">Cara Kerja</a>
            <a href="#details" className="text-[14px] font-medium text-[#475569] transition-colors hover:text-[#0f172a]">Tentang</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-[14px] font-medium text-[#475569] transition-colors hover:text-[#0f172a]">Masuk</Link>
            <Link href="/login" className="rounded-xl px-5 py-2 text-[14px] font-semibold text-white transition-all hover:opacity-90" style={{ background: "#1597e5" }}>Mulai Gratis</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-[#475569] transition-colors hover:bg-[#f1f5f9] md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#e2e8f0] bg-white px-6 py-4 md:hidden">
            <div className="space-y-3">
              <a href="#features" className="block text-[14px] font-medium text-[#475569]">Features</a>
              <a href="#how-it-works" className="block text-[14px] font-medium text-[#475569]">Cara Kerja</a>
              <a href="#details" className="block text-[14px] font-medium text-[#475569]">Tentang</a>
              <Link href="/login" className="block text-[14px] font-medium text-[#475569]">Masuk</Link>
              <Link href="/login" className="block rounded-xl px-5 py-2.5 text-center text-[14px] font-semibold text-white" style={{ background: "#1597e5" }}>Mulai Gratis</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute -top-32 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(ellipse, #65c4ff, transparent 70%)" }} />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div>
                <span className="mb-5 inline-block rounded-full border border-[#e2e8f0] bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-[#1597e5]">Work · Money · Flow</span>
                <h1 className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[56px]">
                  Atur tugas. Kelola uang.
                  <br />
                  <span style={{ color: "#1597e5" }}>Jalani hari dengan lebih terarah.</span>
                </h1>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#475569]">
                  Alflow menyatukan tugas, keuangan, anggaran, dan tabungan dalam satu workspace yang sederhana dan terhubung.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold text-white shadow-lg transition-all hover:opacity-90" style={{ background: "#1597e5", boxShadow: "0 12px 35px rgba(101,196,255,.20)" }}>
                    Mulai Gratis <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="#features" className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3 text-[15px] font-semibold text-[#475569] transition-all hover:border-[#cbd5e1] hover:bg-[#f8fafc]">
                    Lihat Fitur <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-card sm:p-7">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <DashCard label="Saldo" value="Rp5.3Jt" color="#1597e5" bg="#eaf7ff" />
                    <DashCard label="Pemasukan" value="+Rp8.5Jt" color="#10b981" bg="#ecfdf5" />
                    <DashCard label="Pengeluaran" value="−Rp3.2Jt" color="#ef4444" bg="#fef2f2" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <TxRow title="Gaji Bulanan" cat="Gaji" amount="+Rp5.000.000" color="#10b981" />
                    <TxRow title="Sewa Kos" cat="Tagihan" amount="−Rp1.200.000" color="#ef4444" />
                    <TxRow title="Groceries" cat="Makanan" amount="−Rp450.000" color="#ef4444" />
                    <TxRow title="Transport Mingguan" cat="Transport" amount="−Rp180.000" color="#ef4444" />
                  </div>
                </div>
                <FloatingCard className="absolute -left-6 top-8 hidden lg:block" icon={<TrendingUp className="h-4 w-4" />} text="+ Rp5.000.000 Gaji" bg="#ecfdf5" color="#10b981" delay={0.4} />
                <FloatingCard className="absolute -right-6 top-20 hidden lg:block" icon={<CheckCircle2 className="h-4 w-4" />} text="3 tugas selesai" bg="#eaf7ff" color="#1597e5" delay={0.55} />
                <FloatingCard className="absolute -right-4 bottom-8 hidden lg:block" icon={<Target className="h-4 w-4" />} text="Budget 72% terpakai" bg="#fef2f2" color="#ef4444" delay={0.7} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Trust Strip ─── */}
      <section className="border-y border-[#e2e8f0] bg-white py-8">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[14px] font-medium text-[#94a3b8]">
              <span className="flex items-center gap-2"><ListTodo className="h-4 w-4" /> Tugas terorganisir</span>
              <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Keuangan tercatat</span>
              <span className="flex items-center gap-2"><Target className="h-4 w-4" /> Budget terpantau</span>
              <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Data tersinkron</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Core Features — Bento ─── */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#1597e5" }}>Fitur</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Satu workspace untuk semua yang ingin kamu atur.</h2>
              <p className="mt-4 text-[17px] text-[#475569]">Dari tugas kecil sampai rencana keuangan bulanan, semuanya tersusun dalam satu alur yang mudah dipahami.</p>
            </div>
          </FadeIn>
          <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className={`group relative rounded-2xl border border-[#e2e8f0] bg-white transition-all hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-hover ${f.large ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all group-hover:text-white" style={{ background: "#eaf7ff", color: "#1597e5" }}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#0f172a]">{f.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">{f.desc}</p>
                  </div>
                  {f.large && (
                    <div className="mx-6 mb-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                      {f.title === "Task Management" && <TaskPreview />}
                      {f.title === "Financial Overview" && <FinancePreview />}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product Showcase ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#1597e5" }}>Product</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Dirancang untuk kemudahan, bukan untuk pamer.</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-12">
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute -inset-8 rounded-3xl opacity-10 blur-3xl" style={{ background: "radial-gradient(ellipse, #65c4ff, transparent 70%)" }} />
              <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-card">
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[#e2e8f0] p-6 sm:border-b-0 sm:border-r sm:p-8">
                    <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">Tugas</p>
                    <div className="space-y-3">
                      <TaskItem text="Selesaikan laporan proyek" priority="Tinggi" overdue={false} />
                      <TaskItem text="Review pull request" priority="Sedang" overdue={false} />
                      <TaskItem text="Meeting dengan klien" priority="Tinggi" overdue={true} />
                      <TaskItem text="Perbarui dokumentasi API" priority="Rendah" overdue={false} done />
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">Keuangan</p>
                    <div className="grid grid-cols-2 gap-3">
                      <MiniStat label="Saldo" value="Rp5.3Jt" color="#1597e5" bg="#eaf7ff" />
                      <MiniStat label="Pemasukan" value="+Rp8.5Jt" color="#10b981" bg="#ecfdf5" />
                      <MiniStat label="Pengeluaran" value="−Rp3.2Jt" color="#ef4444" bg="#fef2f2" />
                      <MiniStat label="Anggaran" value="72%" color="#f59e0b" bg="#fffbeb" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="border-t border-[#e2e8f0] bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#1597e5" }}>Cara Kerja</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Mulai dari hal sederhana.</h2>
            </div>
          </FadeIn>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="relative">
                  <span className="text-5xl font-extrabold" style={{ color: "#eaf7ff" }}>{s.num}</span>
                  <h3 className="mt-2 text-[16px] font-semibold text-[#0f172a]">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#475569]">{s.desc}</p>
                  {i < HOW_IT_WORKS.length - 1 && <ChevronRight className="absolute right-0 top-8 hidden h-5 w-5 text-[#e2e8f0] lg:block" />}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Feature Detail — Alternating ─── */}
      <section id="details" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 space-y-24">
          {/* Task Management */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#1597e5" }}>Task Management</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Tugas yang jelas, tanpa kebingungan.</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">Buat tugas dengan subtask, atur prioritas, set deadline, dan tambahkan catatan. Status overdue otomatis ditandai.</p>
                <ul className="mt-6 space-y-3">
                  {["Subtask aktif & overdue", "Prioritas rendah, sedang, tinggi", "Deadline dengan peringatan visual"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#1597e5" }} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-card">
                <div className="space-y-3">
                  <TaskItem text="Selesaikan laporan proyek" priority="Tinggi" overdue={false} />
                  <TaskItem text="Review pull request" priority="Sedang" overdue={false} />
                  <TaskItem text="Meeting dengan klien" priority="Tinggi" overdue={true} />
                  <TaskItem text="Perbarui dokumentasi API" priority="Rendah" overdue={false} done />
                  <TaskItem text="Deploy ke staging" priority="Sedang" overdue={false} />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Personal Finance */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-card">
                  <div className="grid grid-cols-3 gap-3">
                    <DashCard label="Saldo" value="Rp5.3Jt" color="#1597e5" bg="#eaf7ff" />
                    <DashCard label="Pemasukan" value="+Rp8.5Jt" color="#10b981" bg="#ecfdf5" />
                    <DashCard label="Pengeluaran" value="−Rp3.2Jt" color="#ef4444" bg="#fef2f2" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <TxRow title="Gaji Bulanan" cat="Gaji" amount="+Rp5.000.000" color="#10b981" />
                    <TxRow title="Sewa Kos" cat="Tagihan" amount="−Rp1.200.000" color="#ef4444" />
                    <TxRow title="Groceries" cat="Makanan" amount="−Rp450.000" color="#ef4444" />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#1597e5" }}>Personal Finance</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Uangmu, jelas kemana perginya.</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">Catat setiap transaksi dengan kategori yang tepat. Lihat ringkasan bulanan dan grafik distribusi pengeluaran.</p>
                <ul className="mt-6 space-y-3">
                  {["Pemasukan vs pengeluaran", "Kategori otomatis", "Rekap bulanan dengan grafik"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#1597e5" }} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Savings & Budget */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#1597e5" }}>Savings & Budget</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Target tercapai, anggaran tetap aman.</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">Buat rencana tabungan dengan target dan deadline. Atur batas anggaran per kategori agar pengeluaran tetap terkendali.</p>
                <div className="mt-6 space-y-4">
                  <BudgetPreview cat="Makanan" used="Rp720.000" total="Rp1.000.000" pct={72} />
                  <BudgetPreview cat="Transport" used="Rp350.000" total="Rp500.000" pct={70} />
                  <BudgetPreview cat="Hiburan" used="Rp200.000" total="Rp300.000" pct={67} />
                </div>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-card">
                <p className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">Rencana Tabungan</p>
                <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[15px] font-semibold text-[#0f172a]">Dana Darurat</p>
                      <p className="text-[13px] text-[#94a3b8]">Target: Rp10.000.000</p>
                    </div>
                    <span className="rounded-lg px-2.5 py-1 text-[12px] font-bold" style={{ background: "#eaf7ff", color: "#1597e5" }}>65%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                    <div className="h-full rounded-full" style={{ width: "65%", background: "#1597e5" }} />
                  </div>
                  <p className="mt-2 text-[12px] text-[#94a3b8]">Tersisa 45 hari · Rp72.222/hari</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16" style={{ background: "linear-gradient(135deg, #65c4ff 0%, #1597e5 100%)" }}>
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "white" }} />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-15 blur-3xl" style={{ background: "white" }} />
              <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">Siap bikin semuanya lebih teratur?</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[17px] text-white/80">Mulai atur tugas, keuangan, dan targetmu dalam satu workspace bersama Alflow.</p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold shadow-lg transition-all hover:bg-white/90" style={{ color: "#1597e5" }}>
                  Mulai Gratis <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/10">
                  <Download className="h-4 w-4" /> Download APK
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
                  <span className="text-[11px] font-bold text-white">A</span>
                </div>
                <span className="text-[15px] font-bold tracking-tight">Alflow</span>
              </div>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[#475569]">Atur tugas. Kelola uang. Jalani hari dengan lebih terarah.</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">Product</p>
              <ul className="mt-3 space-y-2.5">
                {["Tugas", "Keuangan", "Anggaran", "Tabungan", "Rekap"].map((t) => (
                  <li key={t}><a href="#features" className="text-[14px] text-[#475569] transition-colors hover:text-[#0f172a]">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">Resources</p>
              <ul className="mt-3 space-y-2.5">
                {["Cara Kerja", "Dokumentasi", "Update"].map((t) => (
                  <li key={t}><a href="#how-it-works" className="text-[14px] text-[#475569] transition-colors hover:text-[#0f172a]">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">Project</p>
              <ul className="mt-3 space-y-2.5">
                <li><a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[#475569] transition-colors hover:text-[#0f172a]"><Github className="h-4 w-4" /> GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-[#e2e8f0] pt-6 text-center text-[13px] text-[#94a3b8]">
            © 2026 Alflow. Built with care.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Small UI Components ─── */

function DashCard({ label, value, color, bg }: { label: string; value: string; color: string; bg: string }) {
  return (
    <div className="rounded-xl p-3.5" style={{ background: bg }}>
      <p className="text-[12px] font-medium text-[#94a3b8]">{label}</p>
      <p className="mt-0.5 text-[18px] font-bold tabular-nums" style={{ color }}>{value}</p>
    </div>
  );
}

function TxRow({ title, cat, amount, color }: { title: string; cat: string; amount: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3">
      <div>
        <p className="text-[14px] font-medium text-[#0f172a]">{title}</p>
        <p className="text-[12px] text-[#94a3b8]">{cat}</p>
      </div>
      <span className="text-[14px] font-bold tabular-nums" style={{ color }}>{amount}</span>
    </div>
  );
}

function FloatingCard({ children, className, icon, text, bg, color, delay }: {
  children?: React.ReactNode; className?: string;
  icon?: React.ReactNode; text?: string; bg?: string; color?: string; delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 shadow-card ${className || ""}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.4s ease ${delay || 0}s, transform 0.4s ease ${delay || 0}s` }}>
      <div className="flex items-center gap-2.5">
        {icon && <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: bg, color }}>{icon}</div>}
        <span className="text-[13px] font-medium text-[#0f172a]">{text}</span>
      </div>
    </div>
  );
}

function TaskItem({ text, priority, overdue, done }: { text: string; priority: string; overdue: boolean; done?: boolean }) {
  const pColor = priority === "Tinggi" ? "#ef4444" : priority === "Sedang" ? "#f59e0b" : "#10b981";
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${overdue ? "border-red-200 bg-red-50/50" : done ? "border-[#e2e8f0] bg-[#f8fafc] opacity-60" : "border-[#e2e8f0] bg-white"}`}>
      <div className={`flex h-4.5 w-4.5 items-center justify-center rounded border-2 ${done ? "border-[#10b981] bg-[#10b981]" : "border-[#e2e8f0]"}`}>
        {done && <CheckCircle2 className="h-3 w-3 text-white" />}
      </div>
      <div className="flex-1">
        <p className={`text-[14px] font-medium ${done ? "text-[#94a3b8] line-through" : "text-[#0f172a]"}`}>{text}</p>
      </div>
      <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: overdue ? "#fef2f2" : done ? "#f1f5f9" : `${pColor}15`, color: overdue ? "#ef4444" : done ? "#94a3b8" : pColor }}>
        {overdue ? "Terlambat" : done ? "Selesai" : priority}
      </span>
    </div>
  );
}

function TaskPreview() {
  return (
    <div className="space-y-2.5">
      <TaskItem text="Selesaikan laporan proyek" priority="Tinggi" overdue={false} />
      <TaskItem text="Meeting dengan klien" priority="Tinggi" overdue={true} />
      <TaskItem text="Perbarui dokumentasi" priority="Rendah" overdue={false} done />
    </div>
  );
}

function FinancePreview() {
  return (
    <div className="space-y-2.5">
      <TxRow title="Gaji Bulanan" cat="Gaji" amount="+Rp5.000.000" color="#10b981" />
      <TxRow title="Sewa Kos" cat="Tagihan" amount="−Rp1.200.000" color="#ef4444" />
      <TxRow title="Groceries" cat="Makanan" amount="−Rp450.000" color="#ef4444" />
    </div>
  );
}

function MiniStat({ label, value, color, bg }: { label: string; value: string; color: string; bg: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: bg }}>
      <p className="text-[11px] font-medium text-[#94a3b8]">{label}</p>
      <p className="mt-0.5 text-[16px] font-bold tabular-nums" style={{ color }}>{value}</p>
    </div>
  );
}

function BudgetPreview({ cat, used, total, pct }: { cat: string; used: string; total: string; pct: number }) {
  const barColor = pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#1597e5";
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-[#0f172a]">{cat}</span>
        <span className="text-[12px] font-semibold tabular-nums" style={{ color: barColor }}>{pct}%</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-[12px] text-[#94a3b8]">
        <span>{used} / {total}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: barColor }} />
      </div>
    </div>
  );
}