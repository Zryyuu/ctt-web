"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2, ListTodo, Wallet, PiggyBank, Download,
  Target, Repeat, ArrowRight, Github,
  PieChart, TrendingDown,
  Menu, X,
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
            <a href="#beranda" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">Beranda</a>
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
              <a href="#beranda" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Beranda</a>
              <a href="#apa" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Fitur</a>
              <a href="#cara" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Cara Kerja</a>
              <a href="#detail" onClick={() => setMenuOpen(false)} className="block text-[14px] font-medium text-[#475569]">Detail</a>
              <Link href="/login" className="block rounded-[12px] bg-[#1597e5] px-5 py-2.5 text-center text-[14px] font-semibold text-white">Mulai Gratis</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ────────── HERO — asymmetric, not just grid ────────── */}
      <section id="beranda" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[.06] blur-3xl" style={{ background: "radial-gradient(ellipse, #65c4ff, transparent 70%)" }} />
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <Animate>
              <div className="max-w-xl">
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1 text-[12px] font-medium text-[#64748b]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  v2.0 — Anggaran &amp; Transaksi Berulang
                </span>
                <h1 className="text-[32px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]">
                  Uang keluar, tugas numpuk,<br />
                  hidup makin <span className="relative inline-block">
                    <span style={{ color: "#1597e5" }}>kacau</span>
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5C40 2 80 1 100 3s60 3 99-1" stroke="#65c4ff" strokeWidth="2.5" strokeLinecap="round" opacity=".5"/></svg>
                  </span>?
                </h1>
                <p className="mt-5 text-[16px] leading-[1.65] text-[#64748b]">
                  Alflow membantu Anda mengurus semua dari satu tempat. Catat pengeluaran, atur deadline, sampai pantau tabungan — tanpa harus membuka banyak aplikasi.
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
              <FloatCard className="absolute -left-8 top-6" delay={0.5}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ecfdf5]"><TrendingDown className="h-3.5 w-3.5 text-[#10b981]" /></div>
                <div><p className="text-[12px] font-semibold text-[#0f172a]">+ Rp5.000.000</p><p className="text-[11px] text-[#94a3b8]">Gaji masuk hari ini</p></div>
              </FloatCard>
              <FloatCard className="absolute -right-6 top-24" delay={0.65}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf7ff]"><CheckCircle2 className="h-3.5 w-3.5 text-[#1597e5]" /></div>
                <div><p className="text-[12px] font-semibold text-[#0f172a]">3 tugas selesai</p><p className="text-[11px] text-[#94a3b8]">Hari ini</p></div>
              </FloatCard>
              <FloatCard className="absolute -right-4 bottom-6" delay={0.8}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fef2f2]"><Target className="h-3.5 w-3.5 text-[#ef4444]" /></div>
                <div><p className="text-[12px] font-semibold text-[#0f172a]">Budget 72%</p><p className="text-[11px] text-[#94a3b8]">Makanan mendekati batas</p></div>
              </FloatCard>
            </Animate>
          </div>
        </div>
      </section>

      {/* ────────── FITUR — bento grid, dark bg ────────── */}
      <section id="apa" className="bg-[#0f172a] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#65c4ff] mb-3">Kenapa Alflow?</p>
              <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[36px] leading-[1.15] text-white">Anda butuh satu tempat<br className="hidden sm:block" /> untuk mengatur semuanya.</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-white/50">Bukan daftar tugas biasa, bukan aplikasi keuangan biasa. Alflow menggabungkan keduanya — jadi Anda tidak perlu lompat-lompat.</p>
            </div>
          </Animate>

          {/* Bento — dark cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Animate delay={0} className="sm:col-span-2 lg:col-span-2 rounded-[20px] border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[.07] transition-all hover:-translate-y-0.5">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#65c4ff]/10 text-[#65c4ff]"><ListTodo className="h-5 w-5" /></div>
                  <h3 className="text-[17px] font-semibold text-white">Catatan Tugas</h3>
                </div>
                <p className="text-[14px] text-white/50 leading-relaxed mb-5">Buat tugas, bagi menjadi subtask, atur prioritas &amp; deadline. Kalau ada yang terlambat, langsung terlihat.</p>
              </div>
              <div className="mx-5 mb-5 rounded-[14px] border border-white/10 bg-white/5 p-4">
                <div className="space-y-2.5">
                  <TaskItemDark text="Kirim laporan bulanan" p="Tinggi" state="active" />
                  <TaskItemDark text="Review desain UI v2" p="Sedang" state="active" />
                  <TaskItemDark text="Bayar internet" p="Tinggi" state="overdue" />
                  <TaskItemDark text="Backup file project" p="Rendah" state="done" />
                </div>
              </div>
            </Animate>

            <Animate delay={0.08} className="sm:col-span-2 lg:col-span-1 rounded-[20px] border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[.07] transition-all hover:-translate-y-0.5">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#10b981]/10 text-[#10b981]"><Wallet className="h-5 w-5" /></div>
                  <h3 className="text-[17px] font-semibold text-white">Keuangan Jelas</h3>
                </div>
                <p className="text-[14px] text-white/50 leading-relaxed mb-5">Pemasukan, pengeluaran, saldo — semuanya terlihat dalam satu pandangan.</p>
              </div>
              <div className="mx-5 mb-5 rounded-[14px] border border-white/10 bg-white/5 p-4 space-y-2.5">
                <MiniTxDark name="Gaji" amt="+Rp5.000.000" c="#10b981" />
                <MiniTxDark name="Kos" amt="−Rp1.200.000" c="#ef4444" />
                <MiniTxDark name="Makan" amt="−Rp450.000" c="#ef4444" />
              </div>
            </Animate>

            <Animate delay={0.12} className="rounded-[20px] border border-white/10 bg-white/5 p-6 hover:bg-white/[.07] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f59e0b]/10 text-[#f59e0b] mb-3"><Target className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold text-white mb-1.5">Batas Anggaran</h3>
              <p className="text-[14px] text-white/50 leading-relaxed mb-4">Tetapkan limit per kategori. Kalau sudah mulai mendekati batas, Alflow akan memberi tahu.</p>
              <div className="rounded-[12px] border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-medium text-white/80">Makanan</span>
                  <span className="font-semibold text-[#f59e0b]">72%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-[#f59e0b]" style={{ width: "72%" }} /></div>
                <p className="text-[12px] text-white/40 mt-1.5">Rp720.000 / Rp1.000.000</p>
              </div>
            </Animate>

            <Animate delay={0.16} className="rounded-[20px] border border-white/10 bg-white/5 p-6 hover:bg-white/[.07] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#10b981]/10 text-[#10b981] mb-3"><PiggyBank className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold text-white mb-1.5">Target Tabungan</h3>
              <p className="text-[14px] text-white/50 leading-relaxed mb-4">Buat rencana nabung, atur target &amp; deadline. Progress bar-nya membuat termotivasi.</p>
              <div className="rounded-[12px] border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-medium text-white/80">Dana Darurat</span>
                  <span className="font-semibold text-[#65c4ff]">65%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-[#65c4ff]" style={{ width: "65%" }} /></div>
                <p className="text-[12px] text-white/40 mt-1.5">45 hari lagi · Rp72.222/hari</p>
              </div>
            </Animate>

            <Animate delay={0.2} className="rounded-[20px] border border-white/10 bg-white/5 p-6 hover:bg-white/[.07] transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#8b5cf6]/10 text-[#8b5cf6] mb-3"><Repeat className="h-5 w-5" /></div>
              <h3 className="text-[17px] font-semibold text-white mb-1.5">Transaksi Berulang</h3>
              <p className="text-[14px] text-white/50 leading-relaxed">Gaji bulanan, bayar kos, langganan — atur otomatis, tidak perlu input manual setiap bulan.</p>
            </Animate>
          </div>
        </div>
      </section>

      {/* ────────── REKAP BULANAN — full-bleed cerah ────────── */}
      <section className="bg-[#f8fafc] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#1597e5] mb-3">Rekap Bulanan</p>
                <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[36px] leading-[1.15]">Uang Anda habis untuk apa saja,<br />semuanya terlihat di sini.</h2>
                <p className="mt-5 text-[16px] leading-[1.7] text-[#64748b]">
                  Lihat pie chart pengeluaran per kategori. Tahu persis uang Anda habis untuk apa saja — dari makanan, transport, sampai hiburan. Tidak perlu menebak-nebak lagi.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Pie chart interaktif per kategori",
                    "Rekap per bulan yang bisa di-scroll",
                    "Bandingkan pengeluaran bulan ini vs bulan lalu",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2 text-[14px] text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1597e5]" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[13px] font-semibold text-[#0f172a]">Rekap Maret 2026</p>
                  <span className="text-[12px] font-medium text-[#94a3b8]">Rp3.200.000 total</span>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <svg viewBox="0 0 120 120" className="h-40 w-40">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="18" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="18" strokeDasharray="110 204" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="63 251" strokeDashoffset="-110" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" strokeWidth="18" strokeDasharray="45 269" strokeDashoffset="-173" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray="32 282" strokeDashoffset="-218" strokeLinecap="round" transform="rotate(-90 60 60)" />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { cat: "Makanan", pct: "35%", color: "#ef4444" },
                    { cat: "Transport", pct: "20%", color: "#f59e0b" },
                    { cat: "Tagihan", pct: "14%", color: "#3b82f6" },
                    { cat: "Hiburan", pct: "10%", color: "#10b981" },
                  ].map(c => (
                    <div key={c.cat} className="flex items-center gap-2 rounded-[10px] bg-[#f8fafc] px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                      <span className="text-[13px] font-medium text-[#475569]">{c.cat}</span>
                      <span className="ml-auto text-[13px] font-bold tabular-nums" style={{ color: c.color }}>{c.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── CARA KERJA — vertical stepper, gelap ────────── */}
      <section id="cara" className="bg-[#0f172a] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="text-center mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#65c4ff] mb-3">Cara Kerja</p>
              <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[36px] text-white">Mulai dalam 4 langkah mudah.</h2>
              <p className="mt-3 text-[16px] text-white/50">Tidak perlu pengaturan rumit. Langsung pakai.</p>
            </div>
          </Animate>

          <div className="mx-auto max-w-2xl">
            {[
              { n: "01", icon: <ListTodo className="h-5 w-5" />, t: "Pilih cara masuk", d: "Daftar pakai email atau Google. Atau langsung coba sebagai tamu — tanpa perlu daftar.", accent: "#65c4ff" },
              { n: "02", icon: <Wallet className="h-5 w-5" />, t: "Catat aktivitas", d: "Tambah tugas, catat transaksi, atau buat rencana tabungan baru.", accent: "#10b981" },
              { n: "03", icon: <Target className="h-5 w-5" />, t: "Atur batas", d: "Tetapkan budget per kategori dan deadline setiap tugas. Biar ada yang mendorong.", accent: "#f59e0b" },
              { n: "04", icon: <PieChart className="h-5 w-5" />, t: "Pantau terus", d: "Cek rekap bulanan, lihat grafik, dan pastikan semuanya on track.", accent: "#8b5cf6" },
            ].map((s, i) => (
              <Animate key={s.n} delay={i * 0.1}>
                <div className="flex gap-5">
                  {/* left: number + line */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 text-white" style={{ borderColor: s.accent, background: `${s.accent}15` }}>
                      {s.icon}
                    </div>
                    {i < 3 && <div className="w-px flex-1 my-2" style={{ background: `linear-gradient(to bottom, ${s.accent}40, transparent)` }} />}
                  </div>
                  {/* right: content */}
                  <div className={`pb-10 ${i === 3 ? "pb-0" : ""}`}>
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: s.accent }}>Langkah {s.n}</span>
                    <h3 className="text-[17px] font-semibold text-white mt-1">{s.t}</h3>
                    <p className="text-[14px] text-white/50 leading-relaxed mt-1">{s.d}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── DETAIL — alternating full-bleed sections ────────── */}

      {/* Tugas — cerah */}
      <section id="detail" className="bg-[#f8fafc] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1597e5] mb-4">
                  <ListTodo className="h-3 w-3" /> Tugas
                </span>
                <h2 className="text-[26px] font-bold tracking-[-0.01em] sm:text-[32px] leading-[1.15]">Tugas yang jelas,<br />tanpa perlu berpikir dua kali.</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Mulai dari yang kecil — &quot;beli kopi&quot; — sampai yang besar — &quot;menyelesaikan proposal&quot;. Alflow membantu Anda mengurutkan mana yang harus dikerjakan terlebih dahulu.
                </p>
                <ul className="mt-5 space-y-3">
                  {["Subtask untuk memecah jadi bagian kecil", "Prioritas: rendah, sedang, tinggi", "Deadline yang terlihat jelas"].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-[#475569]">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#eaf7ff]"><CheckCircle2 className="h-3 w-3 text-[#1597e5]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e2e8f0]/60">
                  <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  <div className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                  <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span className="ml-auto text-[11px] text-[#94a3b8]">4 tugas aktif</span>
                </div>
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
        </div>
      </section>

      {/* Keuangan — gelap */}
      <section className="bg-[#0f172a] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div className="rounded-[20px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="h-2 w-2 rounded-full bg-[#65c4ff]" />
                  <span className="ml-auto text-[11px] text-white/30">Maret 2026</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard label="Saldo" val="Rp5.3Jt" accent="#65c4ff" bg="rgba(101,196,255,.1)" />
                  <MetricCard label="Masuk" val="+Rp8.5Jt" accent="#10b981" bg="rgba(16,185,129,.1)" />
                  <MetricCard label="Keluar" val="−Rp3.2Jt" accent="#ef4444" bg="rgba(239,68,68,.1)" />
                </div>
                <div className="space-y-2">
                  <TxLineDark name="Gaji Bulanan" cat="Gaji" amt="+Rp5.000.000" color="#10b981" />
                  <TxLineDark name="Sewa Kos" cat="Tagihan" amt="−Rp1.200.000" color="#ef4444" />
                  <TxLineDark name="Groceries" cat="Makanan" amt="−Rp450.000" color="#ef4444" />
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#65c4ff] mb-4">
                  <Wallet className="h-3 w-3" /> Keuangan
                </span>
                <h2 className="text-[26px] font-bold tracking-[-0.01em] sm:text-[32px] leading-[1.15] text-white">Uang masuk dan keluar,<br />semuanya terlihat.</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-white/50">
                  Tidak perlu lagi menebak-nebak sisa saldo di akhir bulan. Catat setiap transaksi, pilih kategori yang tepat, dan biarkan Alflow menghitung semuanya.
                </p>
                <ul className="mt-5 space-y-3">
                  {["Kategori: Makanan, Transport, Tagihan, dll.", "Pie chart distribusi pengeluaran", "Rekap per bulan yang bisa di-scroll"].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-white/60">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#65c4ff]/10"><CheckCircle2 className="h-3 w-3 text-[#65c4ff]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Tabungan & Anggaran — cerah */}
      <section className="bg-[#f8fafc] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1597e5] mb-4">
                  <PiggyBank className="h-3 w-3" /> Tabungan &amp; Anggaran
                </span>
                <h2 className="text-[26px] font-bold tracking-[-0.01em] sm:text-[32px] leading-[1.15]">Menabung ada target,<br />belanja ada batas.</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Buat rencana nabung untuk liburan, dana darurat, atau gadget baru. Atur juga budget bulanan per kategori — agar tidak melebihi batas.
                </p>
                <ul className="mt-5 space-y-3">
                  {["Target nabung dengan deadline", "Budget per kategori: Makanan, Transport, dll.", "Peringatan saat mendekati batas"].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-[#475569]">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#eaf7ff]"><CheckCircle2 className="h-3 w-3 text-[#1597e5]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {/* savings plan 1 */}
                <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eaf7ff] text-[#1597e5]"><PiggyBank className="h-4 w-4" /></div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#0f172a]">Dana Darurat</p>
                        <p className="text-[12px] text-[#94a3b8]">Target Rp10.000.000</p>
                      </div>
                    </div>
                    <span className="rounded-[8px] bg-[#eaf7ff] px-2.5 py-1 text-[12px] font-bold text-[#1597e5]">65%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-[#1597e5]" style={{ width: "65%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-[#94a3b8]">
                    <span>Tersisa Rp3.500.000</span>
                    <span>45 hari lagi</span>
                  </div>
                </div>
                {/* savings plan 2 */}
                <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#ecfdf5] text-[#10b981]"><Target className="h-4 w-4" /></div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#0f172a]">Gadget Baru</p>
                        <p className="text-[12px] text-[#94a3b8]">Target Rp5.000.000</p>
                      </div>
                    </div>
                    <span className="rounded-[8px] bg-[#ecfdf5] px-2.5 py-1 text-[12px] font-bold text-[#10b981]">30%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-[#10b981]" style={{ width: "30%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-[#94a3b8]">
                    <span>Tersisa Rp3.500.000</span>
                    <span>90 hari lagi</span>
                  </div>
                </div>
                {/* budget limits mini */}
                <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Batas Anggaran</p>
                  <div className="space-y-3">
                    <BudgetBar cat="Makanan" used="Rp720K" total="Rp1Jt" pct={72} />
                    <BudgetBar cat="Transport" used="Rp350K" total="Rp500K" pct={70} />
                  </div>
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
              <h2 className="relative text-[28px] font-bold tracking-[-0.01em] text-white sm:text-[36px]">Siap membuat hidup lebih teratur?</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[16px] text-white/80 leading-relaxed">
                Mulai dari sekarang. Gratis, tanpa kartu kredit, dan bisa langsung digunakan tanpa perlu mendaftar.
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

      {/* ────────── FOOTER — Indonesian + social media ────────── */}
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
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Fitur</p>
              <ul className="space-y-2">
                {["Tugas", "Keuangan", "Anggaran", "Tabungan", "Rekap"].map(t => (
                  <li key={t}><a href="#apa" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Tautan</p>
              <ul className="space-y-2">
                {["Cara Kerja", "Dokumentasi", "Pembaruan"].map(t => (
                  <li key={t}><a href="#cara" className="text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Proyek</p>
              <ul className="space-y-2">
                <li><a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors"><Github className="h-3.5 w-3.5" /> GitHub</a></li>
                <li><a href="https://instagram.com/alflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </a></li>
                <li><a href="https://tiktok.com/@alflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[#64748b] hover:text-[#0f172a] transition-colors">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  TikTok
                </a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[#e2e8f0]/60 pt-5 text-center text-[13px] text-[#94a3b8]">
            © 2026 Alflow. Dibuat dengan sepenuh hati.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Shared components ─── */

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

function TxLineDark({ name, cat, amt, color }: { name: string; cat: string; amt: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-3.5 py-2.5">
      <div>
        <p className="text-[13px] font-medium text-white/80">{name}</p>
        <p className="text-[11px] text-white/40">{cat}</p>
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

function MiniTxDark({ name, amt, c }: { name: string; amt: string; c: string }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-3 py-2.5">
      <span className="text-[13px] font-medium text-white/80">{name}</span>
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

function TaskItemDark({ text, p, state }: { text: string; p: string; state: "active" | "overdue" | "done" }) {
  const pc = p === "Tinggi" ? "#ef4444" : p === "Sedang" ? "#f59e0b" : "#10b981";
  return (
    <div className={`flex items-center gap-3 rounded-[12px] border px-3.5 py-2.5 ${
      state === "overdue" ? "border-red-500/20 bg-red-500/10" : state === "done" ? "border-white/10 bg-white/5 opacity-50" : "border-white/10 bg-white/5"
    }`}>
      <div className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        state === "done" ? "border-[#10b981] bg-[#10b981]" : "border-white/20"
      }`}>
        {state === "done" && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
      </div>
      <p className={`flex-1 text-[13px] font-medium ${
        state === "done" ? "text-white/40 line-through" : state === "overdue" ? "text-[#ef4444]" : "text-white/90"
      }`}>{text}</p>
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{
        background: state === "overdue" ? "rgba(239,68,68,.15)" : state === "done" ? "rgba(255,255,255,.05)" : `${pc}18`,
        color: state === "overdue" ? "#ef4444" : state === "done" ? "rgba(255,255,255,.4)" : pc,
      }}>
        {state === "overdue" ? "Terlambat" : state === "done" ? "Selesai" : p}
      </span>
    </div>
  );
}

function BudgetBar({ cat, used, total, pct }: { cat: string; used: string; total: string; pct: number }) {
  const c = pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#1597e5";
  return (
    <div>
      <div className="flex items-center justify-between text-[13px] mb-1.5">
        <span className="font-medium text-[#0f172a]">{cat}</span>
        <span className="font-semibold tabular-nums" style={{ color: c }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} /></div>
      <p className="text-[12px] text-[#94a3b8] mt-1">{used} / {total}</p>
    </div>
  );
}

function BudgetBarDark({ cat, used, total, pct }: { cat: string; used: string; total: string; pct: number }) {
  const c = pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#65c4ff";
  return (
    <div className="rounded-[12px] border border-white/10 bg-white/5 p-3.5">
      <div className="flex items-center justify-between text-[13px] mb-1.5">
        <span className="font-medium text-white/80">{cat}</span>
        <span className="font-semibold tabular-nums" style={{ color: c }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} /></div>
      <p className="text-[12px] text-white/40 mt-1.5">{used} / {total}</p>
    </div>
  );
}