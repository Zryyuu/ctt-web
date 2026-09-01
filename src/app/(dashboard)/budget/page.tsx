"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  loadTransactions, saveTransactions,
  loadSavingsPlans, saveSavingsPlans,
  loadSavingsTransactions, saveSavingsTransactions,
  loadBudgetLimits, saveBudgetLimits,
  loadRecurringTransactions, saveRecurringTransactions,
} from "@/lib/data-service";
import type { Transaction, SavingsPlan, SavingsTransaction, BudgetLimit, RecurringTransaction } from "@/lib/types";
import { formatCurrency, formatDate, formatMonthYear } from "@/lib/utils";
import {
  Plus, Trash2, TrendingUp, TrendingDown, Wallet, PiggyBank,
  ChevronLeft, ChevronRight, Calendar, ArrowUpCircle, ArrowDownCircle,
  Repeat, Target,
} from "lucide-react";

const CATEGORIES = ["Makanan", "Transport", "Belanja", "Hiburan", "Tagihan", "Kesehatan", "Pendidikan", "Lainnya"];
const INCOME_CATEGORIES = ["Gaji", "Investasi", "Tambahan", "Lainnya"];

const CHART_COLORS = ["#1597e5", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6", "#f97316", "#6366f1"];

const ICONS = ["savings", "home", "car", "flight", "phone", "laptop", "school", "medical"];
const ICON_MAP: Record<string, string> = { savings: "🏦", home: "🏠", car: "🚗", flight: "✈️", phone: "📱", laptop: "💻", school: "🎓", medical: "🏥" };

const FREQUENCY_LABELS = { daily: "Harian", weekly: "Mingguan", monthly: "Bulanan", yearly: "Tahunan" };

export default function BudgetPage() {
  const { user, isGuest } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsPlans, setSavingsPlans] = useState<SavingsPlan[]>([]);
  const [savingsTxs, setSavingsTxs] = useState<SavingsTransaction[]>([]);
  const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([]);
  const [recurringTxs, setRecurringTxs] = useState<RecurringTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"transactions" | "savings" | "recap" | "anggaran">("transactions");
  const [recapMonth, setRecapMonth] = useState(new Date());

  const persistTx = useCallback(async (txs: Transaction[]) => {
    try { await saveTransactions(txs); } catch (e) { console.error("Gagal simpan transaksi:", e); }
  }, []);
  const persistPlans = useCallback(async (p: SavingsPlan[]) => {
    try { await saveSavingsPlans(p); } catch (e) { console.error("Gagal simpan rencana:", e); }
  }, []);
  const persistSavTxs = useCallback(async (s: SavingsTransaction[]) => {
    try { await saveSavingsTransactions(s); } catch (e) { console.error("Gagal simpan tabungan:", e); }
  }, []);
  const persistBudget = useCallback(async (b: BudgetLimit[]) => {
    try { await saveBudgetLimits(b); } catch (e) { console.error("Gagal simpan anggaran:", e); }
  }, []);
  const persistRecurring = useCallback(async (r: RecurringTransaction[]) => {
    try { await saveRecurringTransactions(r); } catch (e) { console.error("Gagal simpan berulang:", e); }
  }, []);

  useEffect(() => {
    if (!user && !isGuest) return;
    Promise.all([
      loadTransactions(), loadSavingsPlans(), loadSavingsTransactions(),
      loadBudgetLimits(), loadRecurringTransactions(),
    ]).then(([tx, sp, st, bl, rt]) => {
      setTransactions(tx); setSavingsPlans(sp); setSavingsTxs(st);
      setBudgetLimits(bl); setRecurringTxs(rt); setLoading(false);
    }).catch((e) => { console.error("Gagal memuat data:", e); setLoading(false); });
  }, [user, isGuest]);

  const totalIncome = transactions.filter((t) => t.isIncome).reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => !t.isIncome).reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const addTransaction = (tx: Transaction) => {
    const updated = [tx, ...transactions];
    setTransactions(updated); persistTx(updated);
  };
  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated); persistTx(updated);
  };
  const addRecurring = (rt: RecurringTransaction) => {
    const updated = [rt, ...recurringTxs];
    setRecurringTxs(updated); persistRecurring(updated);
  };
  const deleteRecurring = (id: string) => {
    const updated = recurringTxs.filter((r) => r.id !== id);
    setRecurringTxs(updated); persistRecurring(updated);
  };
  const executeRecurring = (id: string) => {
    const rt = recurringTxs.find((r) => r.id === id);
    if (!rt) return;
    addTransaction({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: rt.title, amount: rt.amount, category: rt.category,
      date: new Date().toISOString(), isIncome: rt.isIncome, notes: rt.notes,
    });
  };

  const addBudgetLimit = (bl: BudgetLimit) => {
    const updated = [...budgetLimits, bl];
    setBudgetLimits(updated); persistBudget(updated);
  };
  const deleteBudgetLimit = (id: string) => {
    const updated = budgetLimits.filter((b) => b.id !== id);
    setBudgetLimits(updated); persistBudget(updated);
  };

  const addSavingsPlan = (plan: SavingsPlan) => {
    const updated = [...savingsPlans, plan];
    setSavingsPlans(updated); persistPlans(updated);
  };
  const deleteSavingsPlan = (id: string) => {
    const updatedPlans = savingsPlans.filter((p) => p.id !== id);
    setSavingsPlans(updatedPlans); persistPlans(updatedPlans);
    const updatedTxs = savingsTxs.filter((t) => t.planId !== id);
    setSavingsTxs(updatedTxs); persistSavTxs(updatedTxs);
  };
  const addToSavings = (planId: string, amount: number, notes: string) => {
    const tx: SavingsTransaction = { id: Date.now().toString(36), planId, amount, date: new Date().toISOString(), notes };
    const updatedTxs = [...savingsTxs, tx];
    setSavingsTxs(updatedTxs); persistSavTxs(updatedTxs);
    const updatedPlans = savingsPlans.map((p) => {
      if (p.id !== planId) return p;
      const newAmt = p.currentAmount + amount;
      return { ...p, currentAmount: newAmt, isCompleted: newAmt >= p.targetAmount };
    });
    setSavingsPlans(updatedPlans); persistPlans(updatedPlans);
  };

  const recapTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === recapMonth.getMonth() && d.getFullYear() === recapMonth.getFullYear();
  });
  const recapIncome = recapTx.filter((t) => t.isIncome).reduce((s, t) => s + t.amount, 0);
  const recapExpense = recapTx.filter((t) => !t.isIncome).reduce((s, t) => s + t.amount, 0);
  const byCategory: Record<string, number> = {};
  recapTx.forEach((t) => { byCategory[t.category] = (byCategory[t.category] || 0) + t.amount * (t.isIncome ? 1 : -1); });

  const expenseByCategory = Object.entries(byCategory)
    .filter(([, v]) => v < 0)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

  const currentMonthStr = `${recapMonth.getFullYear()}-${String(recapMonth.getMonth() + 1).padStart(2, "0")}`;
  const currentLimits = budgetLimits.filter((b) => b.month === currentMonthStr);

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1597e5] border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Keuangan</h1>
          <p className="text-sm text-gray-500">{formatMonthYear(new Date())} · Kelola pemasukan, pengeluaran, dan tabungan Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border bg-white p-4 shadow-card">
          <div className="absolute right-0 top-0 h-14 w-14 rounded-full bg-green-100/50 blur-xl" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-50 p-2"><TrendingUp className="h-5 w-5 text-green-500" /></div>
            <div><p className="text-xs text-gray-500">Pemasukan</p><p className="text-lg font-bold text-green-600">{formatCurrency(totalIncome)}</p></div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border bg-white p-4 shadow-card">
          <div className="absolute right-0 top-0 h-14 w-14 rounded-full bg-red-100/50 blur-xl" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-50 p-2"><TrendingDown className="h-5 w-5 text-red-500" /></div>
            <div><p className="text-xs text-gray-500">Pengeluaran</p><p className="text-lg font-bold text-red-600">{formatCurrency(totalExpense)}</p></div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border bg-white p-4 shadow-card">
          <div className="absolute right-0 top-0 h-14 w-14 rounded-full bg-[#eaf7ff] blur-xl" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#eaf7ff] p-2"><Wallet className="h-5 w-5 text-[#1597e5]" /></div>
            <div><p className="text-xs text-gray-500">Saldo</p><p className={`text-lg font-bold ${balance >= 0 ? "text-[#1597e5]" : "text-red-600"}`}>{formatCurrency(balance)}</p></div>
          </div>
        </div>
      </div>

      <div className="flex rounded-lg border bg-white p-1 shadow-sm">
        {([["transactions", "Transaksi"], ["savings", "Menabung"], ["recap", "Rekap"], ["anggaran", "Anggaran"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${tab === key ? "bg-[#1597e5] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "transactions" && (
        <>
          {recurringTxs.filter((r) => r.isActive).length > 0 && (
            <RecurringSection recurring={recurringTxs} onExecute={executeRecurring} onDelete={deleteRecurring} />
          )}
          <TransactionsTab transactions={transactions} onAdd={addTransaction} onDelete={deleteTransaction} onAddRecurring={addRecurring} />
        </>
      )}
      {tab === "savings" && (
        <SavingsTab plans={savingsPlans} txs={savingsTxs} onAddPlan={addSavingsPlan} onDeletePlan={deleteSavingsPlan} onAdd={addToSavings} />
      )}
      {tab === "recap" && (
        <RecapTab month={recapMonth} onChangeMonth={setRecapMonth} transactions={recapTx} income={recapIncome} expense={recapExpense} byCategory={byCategory} />
      )}
      {tab === "anggaran" && (
        <BudgetTab limits={currentLimits} onAdd={addBudgetLimit} onDelete={deleteBudgetLimit} expenseByCategory={expenseByCategory} month={currentMonthStr} />
      )}
    </div>
  );
}

function RecurringSection({ recurring, onExecute, onDelete }: { recurring: RecurringTransaction[]; onExecute: (id: string) => void; onDelete: (id: string) => void }) {
  const active = recurring.filter((r) => r.isActive);
  if (active.length === 0) return null;
  return (
    <div className="rounded-xl border bg-[#eaf7ff] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a]"><Repeat className="h-4 w-4" /> Transaksi Berulang</h2>
      </div>
      <div className="space-y-2">
        {active.map((rt) => (
          <div key={rt.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-900">{rt.title}</p>
              <p className="text-xs text-gray-400">{FREQUENCY_LABELS[rt.frequency]} · {rt.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${rt.isIncome ? "text-green-600" : "text-red-600"}`}>
                {rt.isIncome ? "+" : "-"}{formatCurrency(rt.amount)}
              </span>
              <button onClick={() => onExecute(rt.id)} className="rounded bg-[#1597e5] px-2 py-1 text-[10px] font-medium text-white hover:bg-[#1285cc]">Buat</button>
              <button onClick={() => onDelete(rt.id)} className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionsTab({ transactions, onAdd, onDelete, onAddRecurring }: { transactions: Transaction[]; onAdd: (t: Transaction) => void; onDelete: (id: string) => void; onAddRecurring: (rt: RecurringTransaction) => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showRecurring, setShowRecurring] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{transactions.length} transaksi</p>
        <div className="flex gap-2">
          <button onClick={() => setShowRecurring(true)} className="flex items-center gap-2 rounded-lg bg-[#1597e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#1285cc] transition-colors">
            <Repeat className="h-4 w-4" /> Berulang
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-lg bg-[#1597e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#1285cc] transition-colors">
            <Plus className="h-4 w-4" /> Tambah
          </button>
        </div>
      </div>
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 py-16">
          <Wallet className="h-12 w-12 text-gray-300" />
          <p className="mt-3 text-gray-500">Belum ada transaksi</p>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.slice(0, 50).map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm">
              <div className={`rounded-lg p-2 ${tx.isIncome ? "bg-green-50" : "bg-red-50"}`}>
                {tx.isIncome ? <ArrowUpCircle className="h-5 w-5 text-green-500" /> : <ArrowDownCircle className="h-5 w-5 text-red-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{tx.title}</p>
                <p className="text-xs text-gray-400">{tx.category} · {formatDate(new Date(tx.date))}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${tx.isIncome ? "text-green-600" : "text-red-600"}`}>
                  {tx.isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                </span>
                <button onClick={() => onDelete(tx.id)} className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAdd && <AddTransactionDialog onAdd={(tx) => { onAdd(tx); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
      {showRecurring && <AddRecurringDialog onAdd={(rt) => { onAddRecurring(rt); setShowRecurring(false); }} onClose={() => setShowRecurring(false)} />}
    </div>
  );
}

function AddTransactionDialog({ onAdd, onClose }: { onAdd: (t: Transaction) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title.trim(), amount: amt, category,
      date: new Date(date).toISOString(), isIncome, notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold">Tambah Transaksi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsIncome(false)} className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${!isIncome ? "border-red-400 bg-red-50 text-red-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>Pengeluaran</button>
            <button type="button" onClick={() => setIsIncome(true)} className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${isIncome ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>Pemasukan</button>
          </div>
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul transaksi" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" required />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm focus:border-[#1597e5] focus:outline-none" required min="1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none">
              {(isIncome ? INCOME_CATEGORIES : CATEGORIES).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" />
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan (opsional)" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2.5 text-sm font-medium hover:bg-gray-50">Batal</button>
            <button type="submit" className="flex-1 rounded-lg bg-[#1597e5] py-2.5 text-sm font-medium text-white hover:bg-[#1285cc]">Tambah</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddRecurringDialog({ onAdd, onClose }: { onAdd: (rt: RecurringTransaction) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    const nextDate = new Date();
    if (frequency === "daily") nextDate.setDate(nextDate.getDate() + 1);
    else if (frequency === "weekly") nextDate.setDate(nextDate.getDate() + 7);
    else if (frequency === "monthly") nextDate.setMonth(nextDate.getMonth() + 1);
    else nextDate.setFullYear(nextDate.getFullYear() + 1);
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title.trim(), amount: amt, category, isIncome, frequency,
      nextDate: nextDate.toISOString(), notes, isActive: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold">Tambah Transaksi Berulang</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsIncome(false)} className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${!isIncome ? "border-red-400 bg-red-50 text-red-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>Pengeluaran</button>
            <button type="button" onClick={() => setIsIncome(true)} className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${isIncome ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>Pemasukan</button>
          </div>
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul (contoh: Gaji, Bayar kos)" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" required />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm focus:border-[#1597e5] focus:outline-none" required min="1" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none">
            {(isIncome ? INCOME_CATEGORIES : CATEGORIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500">Frekuensi</p>
            <div className="grid grid-cols-4 gap-2">
              {(["daily", "weekly", "monthly", "yearly"] as const).map((f) => (
                <button key={f} type="button" onClick={() => setFrequency(f)} className={`rounded-lg border py-2 text-xs font-medium transition-colors ${frequency === f ? "border-[#1597e5] bg-[#eaf7ff] text-[#1597e5]" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                  {FREQUENCY_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan (opsional)" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2.5 text-sm font-medium hover:bg-gray-50">Batal</button>
            <button type="submit" className="flex-1 rounded-lg bg-[#1597e5] py-2.5 text-sm font-medium text-white hover:bg-[#1285cc]">Buat</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SavingsTab({ plans, txs, onAddPlan, onDeletePlan, onAdd }: {
  plans: SavingsPlan[]; txs: SavingsTransaction[];
  onAddPlan: (p: SavingsPlan) => void; onDeletePlan: (id: string) => void;
  onAdd: (planId: string, amount: number, notes: string) => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [addToPlanId, setAddToPlanId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{plans.length} rencana</p>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-lg bg-[#1597e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#1285cc]">
          <Plus className="h-4 w-4" /> Rencana Baru
        </button>
      </div>
      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 py-16">
          <PiggyBank className="h-12 w-12 text-gray-300" />
          <p className="mt-3 text-gray-500">Belum ada rencana menabung</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => {
            const progress = plan.targetAmount > 0 ? (plan.currentAmount / plan.targetAmount) * 100 : 0;
            const remaining = plan.targetAmount - plan.currentAmount;
            const daysLeft = Math.max(0, Math.ceil((new Date(plan.targetDate).getTime() - Date.now()) / 86400000));
            const daily = daysLeft > 0 ? remaining / daysLeft : 0;
            const planTxs = txs.filter((t) => t.planId === plan.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            const isOverdue = new Date(plan.targetDate) < new Date() && !plan.isCompleted;

            return (
              <div key={plan.id} className={`rounded-xl border bg-white p-4 shadow-sm ${isOverdue ? "border-red-300" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{ICON_MAP[plan.icon] || "🏦"}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{plan.name}</h3>
                        {plan.isCompleted && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">SELESAI</span>}
                        {isOverdue && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">TERLAMBAT</span>}
                      </div>
                      <p className="text-sm text-gray-500">{formatCurrency(plan.currentAmount)} / {formatCurrency(plan.targetAmount)}</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-[#e8f6ff] px-2 py-1 text-xs font-bold text-[#1597e5]">{progress.toFixed(1)}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-[#eaf7ff]0 transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Target: {formatDate(new Date(plan.targetDate))}</span>
                  {daysLeft > 0 && <span>{daysLeft} hari lagi</span>}
                </div>
                {!plan.isCompleted && remaining > 0 && <p className="mt-1 text-xs text-[#1597e5]">Per hari: {formatCurrency(daily)}</p>}
                <div className="mt-3 flex gap-2">
                  {!plan.isCompleted && (
                    <button onClick={() => setAddToPlanId(addToPlanId === plan.id ? null : plan.id)} className="flex-1 rounded-lg bg-[#1597e5] py-2 text-xs font-medium text-white hover:bg-[#1285cc]">+ Tabung</button>
                  )}
                  <button onClick={() => onDeletePlan(plan.id)} className="rounded-lg border px-3 py-2 text-xs text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
                {addToPlanId === plan.id && <AddToSavingsInline onAdd={(amt, notes) => { onAdd(plan.id, amt, notes); setAddToPlanId(null); }} />}
                {planTxs.length > 0 && (
                  <div className="mt-3 border-t pt-3">
                    <p className="mb-1 text-xs font-medium text-gray-500">Riwayat:</p>
                    {planTxs.slice(0, 3).map((t) => (
                      <div key={t.id} className="flex items-center justify-between py-1 text-xs">
                        <span className="text-gray-600">{formatDate(new Date(t.date))}</span>
                        <span className="font-medium text-green-600">+{formatCurrency(t.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {showAdd && <AddSavingsPlanDialog onAdd={(p) => { onAddPlan(p); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function AddToSavingsInline({ onAdd }: { onAdd: (amount: number, notes: string) => void }) {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <div className="mt-3 rounded-lg bg-gray-50 p-3 space-y-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rp</span>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Jumlah" className="w-full rounded-lg border py-2 pl-8 pr-3 text-sm focus:border-[#1597e5] focus:outline-none" min="1" />
      </div>
      <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-[#1597e5] focus:outline-none" />
      <button onClick={() => { const a = parseFloat(amount); if (a > 0) onAdd(a, notes); }} className="w-full rounded-lg bg-green-600 py-2 text-xs font-medium text-white hover:bg-green-700">Simpan</button>
    </div>
  );
}

function AddSavingsPlanDialog({ onAdd, onClose }: { onAdd: (p: SavingsPlan) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [desc, setDesc] = useState("");
  const [targetDate, setTargetDate] = useState(new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0]);
  const [icon, setIcon] = useState("savings");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !target) return;
    const t = parseFloat(target);
    if (isNaN(t) || t <= 0) return;
    onAdd({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: name.trim(), targetAmount: t, currentAmount: 0, targetDate: new Date(targetDate).toISOString(), description: desc, icon, color: "#1597e5", isCompleted: false });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold">Rencana Menabung Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama rencana" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" required />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target jumlah" className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm focus:border-[#1597e5] focus:outline-none" required min="1" />
          </div>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Deskripsi (opsional)" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-[#1597e5] focus:outline-none" />
          <div><p className="mb-2 text-xs font-medium text-gray-500">Icon</p><div className="flex gap-2">{ICONS.map((ic) => <button key={ic} type="button" onClick={() => setIcon(ic)} className={`rounded-lg border-2 p-2 text-lg ${icon === ic ? "border-[#1597e5] bg-[#eaf7ff]" : "border-gray-200"}`}>{ICON_MAP[ic]}</button>)}</div></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2.5 text-sm font-medium hover:bg-gray-50">Batal</button><button type="submit" className="flex-1 rounded-lg bg-[#1597e5] py-2.5 text-sm font-medium text-white hover:bg-[#1285cc]">Buat</button></div>
        </form>
      </div>
    </div>
  );
}

function RecapTab({ month, onChangeMonth, transactions, income, expense, byCategory }: {
  month: Date; onChangeMonth: (d: Date) => void;
  transactions: Transaction[]; income: number; expense: number;
  byCategory: Record<string, number>;
}) {
  const cats = Object.entries(byCategory).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const expenseCats = cats.filter(([, v]) => v < 0);

  const maxCat = Math.max(...expenseCats.map(([, v]) => Math.abs(v)), 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => onChangeMonth(new Date(month.getFullYear(), month.getMonth() - 1))} className="rounded-lg p-2 hover:bg-gray-100"><ChevronLeft className="h-5 w-5" /></button>
        <span className="text-lg font-bold">{formatMonthYear(month)}</span>
        <button onClick={() => onChangeMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className="rounded-lg p-2 hover:bg-gray-100"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-green-50 p-4"><p className="text-xs text-green-600">Pemasukan</p><p className="text-xl font-bold text-green-700">{formatCurrency(income)}</p></div>
        <div className="rounded-xl border bg-red-50 p-4"><p className="text-xs text-red-600">Pengeluaran</p><p className="text-xl font-bold text-red-700">{formatCurrency(expense)}</p></div>
      </div>

      {expenseCats.length > 0 && (
        <>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="mb-3 font-bold text-gray-900">Ringkasan Kategori</h3>
            <div className="space-y-2">
              {expenseCats.map(([cat, val]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{cat}</span>
                      <span className="text-sm font-bold text-red-600">{formatCurrency(Math.abs(val))}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-red-400" style={{ width: `${(Math.abs(val) / maxCat) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PieChartCategory categories={expenseCats} />
        </>
      )}

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-bold text-gray-900">Pemasukan vs Pengeluaran</h3>
        <BarChartSimple income={income} expense={expense} />
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-bold text-gray-900">Transaksi Bulan Ini</h3>
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada transaksi bulan ini</p>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 20).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  {tx.isIncome ? <ArrowUpCircle className="h-4 w-4 text-green-500" /> : <ArrowDownCircle className="h-4 w-4 text-red-500" />}
                  <div><p className="text-sm font-medium text-gray-900">{tx.title}</p><p className="text-xs text-gray-400">{tx.category} · {formatDate(new Date(tx.date))}</p></div>
                </div>
                <span className={`text-sm font-bold ${tx.isIncome ? "text-green-600" : "text-red-600"}`}>{tx.isIncome ? "+" : "-"}{formatCurrency(tx.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PieChartCategory({ categories }: { categories: [string, number][] }) {
  const total = categories.reduce((s, [, v]) => s + Math.abs(v), 0);
  if (total === 0) return null;

  let offset = 0;
  const slices = categories.map(([cat, val], idx) => {
    const pct = Math.abs(val) / total;
    const angle = pct * 360;
    const startOffset = offset;
    offset += angle;
    const color = CHART_COLORS[idx % CHART_COLORS.length];
    return { cat, val, pct, angle, color, startOffset };
  });

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-bold text-gray-900">Distribusi Pengeluaran</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {slices.map((s, i) => {
              if (s.pct >= 1) return <circle key={i} cx="50" cy="50" r="40" fill={s.color} />;
              const r = 40;
              const cx = 50;
              const cy = 50;
              const radius = r;
              const circumference = 2 * Math.PI * radius;
              const dashLen = s.pct * circumference;
              const gap = circumference - dashLen;
              return (
                <circle key={i} cx={cx} cy={cy} r={radius} fill="none" stroke={s.color} strokeWidth="12"
                  strokeDasharray={`${dashLen} ${gap}`} strokeDashoffset={-s.startOffset * (circumference / 360)}
                  transform="rotate(-90 50 50)" />
              );
            })}
            <circle cx="50" cy="50" r="28" fill="white" />
            <text x="50" y="48" textAnchor="middle" className="text-xs font-bold fill-gray-600" fontSize="8">Total</text>
            <text x="50" y="57" textAnchor="middle" className="text-xs font-bold fill-gray-900" fontSize="9">{formatCurrency(total)}</text>
          </svg>
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {slices.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-gray-600">{s.cat} ({formatCurrency(Math.abs(s.val))})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarChartSimple({ income, expense }: { income: number; expense: number }) {
  const max = Math.max(income, expense, 1);
  const incomeH = (income / max) * 100;
  const expenseH = (expense / max) * 100;

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between text-xs mb-1"><span className="text-green-600 font-medium">Pemasukan</span><span className="text-gray-500">{formatCurrency(income)}</span></div>
        <div className="h-4 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${incomeH}%` }} /></div>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs mb-1"><span className="text-red-600 font-medium">Pengeluaran</span><span className="text-gray-500">{formatCurrency(expense)}</span></div>
        <div className="h-4 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${expenseH}%` }} /></div>
      </div>
      {income > 0 && expense > 0 && (
        <div className="rounded-lg bg-[#eaf7ff] p-2 text-center text-xs font-medium text-[#1597e5]">
          Selisih: {formatCurrency(income - expense)} {income >= expense ? "😊" : "⚠️"}
        </div>
      )}
    </div>
  );
}

function BudgetTab({ limits, onAdd, onDelete, expenseByCategory, month }: {
  limits: BudgetLimit[]; onAdd: (b: BudgetLimit) => void; onDelete: (id: string) => void;
  expenseByCategory: [string, number][]; month: string;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [limitAmount, setLimitAmount] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!limitAmount || parseFloat(limitAmount) <= 0) return;
    onAdd({ id: Date.now().toString(36), category: selectedCategory, amount: parseFloat(limitAmount), month });
    setShowAdd(false);
    setLimitAmount("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900"><Target className="h-5 w-5" /> Batas Anggaran Bulan Ini</h2>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-lg bg-[#1597e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#1285cc]">
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </div>

      {limits.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-12 text-center">
          <Target className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-gray-500">Belum ada batas anggaran</p>
          <p className="text-xs text-gray-400">Atur batas pengeluaran per kategori</p>
        </div>
      ) : (
        <div className="space-y-3">
          {limits.map((bl) => {
            const spent = Math.abs(expenseByCategory.find(([c]) => c === bl.category)?.[1] || 0);
            const progress = bl.amount > 0 ? Math.min((spent / bl.amount) * 100, 100) : 0;
            const over = spent > bl.amount;
            const remaining = bl.amount - spent;

            return (
              <div key={bl.id} className={`rounded-xl border bg-white p-4 shadow-sm ${over ? "border-red-300 bg-red-50" : ""}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{bl.category}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(spent)} / {formatCurrency(bl.amount)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {over ? <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">LEBIH</span> : <span className="rounded-lg bg-[#e8f6ff] px-2 py-1 text-xs font-bold text-[#1597e5]">{progress.toFixed(0)}%</span>}
                    <button onClick={() => onDelete(bl.id)} className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className={`h-full rounded-full transition-all ${over ? "bg-red-500" : progress > 80 ? "bg-yellow-500" : "bg-[#eaf7ff]0"}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="mt-1 text-xs text-gray-400">{over ? `Lebih ${formatCurrency(Math.abs(remaining))}` : `Sisa ${formatCurrency(remaining)}`}</div>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <form onSubmit={handleAdd} className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Batas Anggaran Baru</h3>
          <div className="grid grid-cols-2 gap-2">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="rounded-lg border px-3 py-2 text-sm focus:border-[#1597e5] focus:outline-none">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Rp</span>
              <input type="number" value={limitAmount} onChange={(e) => setLimitAmount(e.target.value)} placeholder="Batas" className="w-full rounded-lg border py-2 pl-8 pr-3 text-sm focus:border-[#1597e5] focus:outline-none" required min="1" />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 rounded-lg bg-[#1597e5] py-2 text-sm font-medium text-white hover:bg-[#1285cc]">Simpan</button>
            <button type="button" onClick={() => setShowAdd(false)} className="flex-1 rounded-lg border py-2 text-sm font-medium hover:bg-gray-50">Batal</button>
          </div>
        </form>
      )}

      {expenseByCategory.length > 0 && (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="mb-3 font-bold text-gray-900">Ringkasan Pengeluaran</h3>
          <div className="space-y-2">
            {expenseByCategory.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).map(([cat, val]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{cat}</span>
                <span className="text-sm font-bold text-red-600">{formatCurrency(Math.abs(val))}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-2 font-bold">
              <span>Total</span><span className="text-red-600">{formatCurrency(Math.abs(expenseByCategory.reduce((s, [, v]) => s + v, 0)))}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}