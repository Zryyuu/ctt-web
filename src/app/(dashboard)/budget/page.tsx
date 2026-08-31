"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  loadTransactions, saveTransactions,
  loadSavingsPlans, saveSavingsPlans,
  loadSavingsTransactions, saveSavingsTransactions,
} from "@/lib/data-service";
import type { Transaction, SavingsPlan, SavingsTransaction } from "@/lib/types";
import { formatCurrency, formatDate, formatMonthYear } from "@/lib/utils";
import {
  Plus, Trash2, TrendingUp, TrendingDown, Wallet, PiggyBank,
  ChevronLeft, ChevronRight, Calendar, ArrowUpCircle, ArrowDownCircle,
} from "lucide-react";

const ICONS = ["savings", "home", "car", "flight", "phone", "laptop", "school", "medical"];
const ICON_MAP: Record<string, string> = { savings: "🏦", home: "🏠", car: "🚗", flight: "✈️", phone: "📱", laptop: "💻", school: "🎓", medical: "🏥" };

export default function BudgetPage() {
  const { user, isGuest } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsPlans, setSavingsPlans] = useState<SavingsPlan[]>([]);
  const [savingsTxs, setSavingsTxs] = useState<SavingsTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"transactions" | "savings" | "recap">("transactions");
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

  useEffect(() => {
    if (!user && !isGuest) return;
    Promise.all([loadTransactions(), loadSavingsPlans(), loadSavingsTransactions()])
      .then(([tx, sp, st]) => { setTransactions(tx); setSavingsPlans(sp); setSavingsTxs(st); setLoading(false); })
      .catch((e) => { console.error("Gagal memuat data keuangan:", e); setLoading(false); });
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

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Keuangan</h1>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-50 p-2"><TrendingUp className="h-5 w-5 text-green-500" /></div>
            <div><p className="text-xs text-gray-500">Pemasukan</p><p className="text-lg font-bold text-green-600">{formatCurrency(totalIncome)}</p></div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-50 p-2"><TrendingDown className="h-5 w-5 text-red-500" /></div>
            <div><p className="text-xs text-gray-500">Pengeluaran</p><p className="text-lg font-bold text-red-600">{formatCurrency(totalExpense)}</p></div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-50 p-2"><Wallet className="h-5 w-5 text-indigo-500" /></div>
            <div><p className="text-xs text-gray-500">Saldo</p><p className={`text-lg font-bold ${balance >= 0 ? "text-indigo-600" : "text-red-600"}`}>{formatCurrency(balance)}</p></div>
          </div>
        </div>
      </div>

      <div className="flex rounded-lg border bg-white p-1 shadow-sm">
        {([["transactions", "Transaksi"], ["savings", "Menabung"], ["recap", "Rekap"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${tab === key ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "transactions" && (
        <TransactionsTab transactions={transactions} onAdd={addTransaction} onDelete={deleteTransaction} />
      )}
      {tab === "savings" && (
        <SavingsTab plans={savingsPlans} txs={savingsTxs} onAddPlan={addSavingsPlan} onDeletePlan={deleteSavingsPlan} onAdd={addToSavings} />
      )}
      {tab === "recap" && (
        <RecapTab
          month={recapMonth} onChangeMonth={setRecapMonth}
          transactions={recapTx} income={recapIncome} expense={recapExpense} byCategory={byCategory}
        />
      )}
    </div>
  );
}

function TransactionsTab({ transactions, onAdd, onDelete }: { transactions: Transaction[]; onAdd: (t: Transaction) => void; onDelete: (id: string) => void }) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{transactions.length} transaksi</p>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
          <Plus className="h-4 w-4" /> Tambah
        </button>
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
                <p className="text-xs text-gray-400">{formatDate(new Date(tx.date))}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${tx.isIncome ? "text-green-600" : "text-red-600"}`}>
                  {tx.isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                </span>
                <button onClick={() => onDelete(tx.id)} className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAdd && <AddTransactionDialog onAdd={(tx) => { onAdd(tx); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function AddTransactionDialog({ onAdd, onClose }: { onAdd: (t: Transaction) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title.trim(), amount: amt, category: isIncome ? "Pemasukan" : "Pengeluaran",
      date: new Date(date).toISOString(), isIncome, notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold">Tambah Transaksi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsIncome(false)} className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${!isIncome ? "border-red-400 bg-red-50 text-red-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              Pengeluaran
            </button>
            <button type="button" onClick={() => setIsIncome(true)} className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${isIncome ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              Pemasukan
            </button>
          </div>
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul transaksi" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" required />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none" required min="1" />
          </div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" />
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan (opsional)" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2.5 text-sm font-medium hover:bg-gray-50">Batal</button>
            <button type="submit" className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">Tambah</button>
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
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
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
                  <span className="rounded-lg bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700">{progress.toFixed(1)}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Target: {formatDate(new Date(plan.targetDate))}</span>
                  {daysLeft > 0 && <span>{daysLeft} hari lagi</span>}
                </div>
                {!plan.isCompleted && remaining > 0 && (
                  <p className="mt-1 text-xs text-indigo-600">Per hari: {formatCurrency(daily)}</p>
                )}
                <div className="mt-3 flex gap-2">
                  {!plan.isCompleted && (
                    <button onClick={() => setAddToPlanId(addToPlanId === plan.id ? null : plan.id)} className="flex-1 rounded-lg bg-indigo-600 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                      + Tabung
                    </button>
                  )}
                  <button onClick={() => onDeletePlan(plan.id)} className="rounded-lg border px-3 py-2 text-xs text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {addToPlanId === plan.id && (
                  <AddToSavingsInline onAdd={(amt, notes) => { onAdd(plan.id, amt, notes); setAddToPlanId(null); }} />
                )}
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
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Jumlah" className="w-full rounded-lg border py-2 pl-8 pr-3 text-sm focus:border-indigo-500 focus:outline-none" min="1" />
      </div>
      <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
      <button
        onClick={() => { const a = parseFloat(amount); if (a > 0) onAdd(a, notes); }}
        className="w-full rounded-lg bg-green-600 py-2 text-xs font-medium text-white hover:bg-green-700"
      >
        Simpan
      </button>
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
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name.trim(), targetAmount: t, currentAmount: 0,
      targetDate: new Date(targetDate).toISOString(), description: desc,
      icon, color: "#4f46e5", isCompleted: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold">Rencana Menabung Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama rencana" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" required />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target jumlah" className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none" required min="1" />
          </div>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Deskripsi (opsional)" className="w-full rounded-lg border px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" />
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500">Icon</p>
            <div className="flex gap-2">
              {ICONS.map((ic) => (
                <button key={ic} type="button" onClick={() => setIcon(ic)} className={`rounded-lg border-2 p-2 text-lg ${icon === ic ? "border-indigo-400 bg-indigo-50" : "border-gray-200"}`}>
                  {ICON_MAP[ic]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2.5 text-sm font-medium hover:bg-gray-50">Batal</button>
            <button type="submit" className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">Buat</button>
          </div>
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => onChangeMonth(new Date(month.getFullYear(), month.getMonth() - 1))} className="rounded-lg p-2 hover:bg-gray-100"><ChevronLeft className="h-5 w-5" /></button>
        <span className="text-lg font-bold">{formatMonthYear(month)}</span>
        <button onClick={() => onChangeMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className="rounded-lg p-2 hover:bg-gray-100"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-green-50 p-4">
          <p className="text-xs text-green-600">Pemasukan</p>
          <p className="text-xl font-bold text-green-700">{formatCurrency(income)}</p>
        </div>
        <div className="rounded-xl border bg-red-50 p-4">
          <p className="text-xs text-red-600">Pengeluaran</p>
          <p className="text-xl font-bold text-red-700">{formatCurrency(expense)}</p>
        </div>
      </div>
      {cats.length > 0 && (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="mb-3 font-bold text-gray-900">Ringkasan Kategori</h3>
          <div className="space-y-2">
            {cats.map(([cat, val]) => (
              <div key={cat} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {val >= 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span className="text-sm text-gray-700">{cat}</span>
                </div>
                <span className={`text-sm font-bold ${val >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {val >= 0 ? "+" : "-"}{formatCurrency(Math.abs(val))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
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
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.title}</p>
                    <p className="text-xs text-gray-400">{formatDate(new Date(tx.date))}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.isIncome ? "text-green-600" : "text-red-600"}`}>
                  {tx.isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
