import { auth } from "./firebase";
import {
  loadTodos as fbLoadTodos, saveTodos as fbSaveTodos,
  loadTransactions as fbLoadTransactions, saveTransactions as fbSaveTransactions,
  loadSavingsPlans as fbLoadPlans, saveSavingsPlans as fbSavePlans,
  loadSavingsTransactions as fbLoadSavTxs, saveSavingsTransactions as fbSaveSavTxs,
  loadBudgetLimits as fbLoadBudgetLimits, saveBudgetLimits as fbSaveBudgetLimits,
  loadRecurringTransactions as fbLoadRecurringTxs, saveRecurringTransactions as fbSaveRecurringTxs,
} from "./firestore";
import type { TodoItem, Transaction, SavingsPlan, SavingsTransaction, BudgetLimit, RecurringTransaction } from "./types";

// --- localStorage helpers (guest mode) ---
function localGet<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function localSet<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage full or blocked
  }
}

const KEYS = {
  todos: "ctt_guest_todos",
  transactions: "ctt_guest_transactions",
  savingsPlans: "ctt_guest_savings_plans",
  savingsTxs: "ctt_guest_savings_transactions",
  budgetLimits: "ctt_guest_budget_limits",
  recurringTxs: "ctt_guest_recurring_transactions",
} as const;

function isGuest(): boolean {
  return !auth.currentUser;
}

// --- Unified DataService ---
export async function loadTodos(): Promise<TodoItem[]> {
  if (isGuest()) return localGet<TodoItem>(KEYS.todos);
  try {
    return await fbLoadTodos();
  } catch (e) {
    console.error("Failed to load todos from Firestore, falling back to local:", e);
    return localGet<TodoItem>(KEYS.todos);
  }
}

export async function saveTodos(todos: TodoItem[]): Promise<void> {
  if (isGuest()) { localSet(KEYS.todos, todos); return; }
  try {
    await fbSaveTodos(todos);
  } catch (e) {
    console.error("Failed to save todos to Firestore, saving locally:", e);
    localSet(KEYS.todos, todos);
  }
}

export async function loadTransactions(): Promise<Transaction[]> {
  if (isGuest()) return localGet<Transaction>(KEYS.transactions);
  try {
    return await fbLoadTransactions();
  } catch (e) {
    console.error("Failed to load transactions from Firestore:", e);
    return localGet<Transaction>(KEYS.transactions);
  }
}

export async function saveTransactions(txs: Transaction[]): Promise<void> {
  if (isGuest()) { localSet(KEYS.transactions, txs); return; }
  try {
    await fbSaveTransactions(txs);
  } catch (e) {
    console.error("Failed to save transactions to Firestore:", e);
    localSet(KEYS.transactions, txs);
  }
}

export async function loadSavingsPlans(): Promise<SavingsPlan[]> {
  if (isGuest()) return localGet<SavingsPlan>(KEYS.savingsPlans);
  try {
    return await fbLoadPlans();
  } catch (e) {
    console.error("Failed to load savings plans from Firestore:", e);
    return localGet<SavingsPlan>(KEYS.savingsPlans);
  }
}

export async function saveSavingsPlans(plans: SavingsPlan[]): Promise<void> {
  if (isGuest()) { localSet(KEYS.savingsPlans, plans); return; }
  try {
    await fbSavePlans(plans);
  } catch (e) {
    console.error("Failed to save savings plans to Firestore:", e);
    localSet(KEYS.savingsPlans, plans);
  }
}

export async function loadSavingsTransactions(): Promise<SavingsTransaction[]> {
  if (isGuest()) return localGet<SavingsTransaction>(KEYS.savingsTxs);
  try {
    return await fbLoadSavTxs();
  } catch (e) {
    console.error("Failed to load savings txs from Firestore:", e);
    return localGet<SavingsTransaction>(KEYS.savingsTxs);
  }
}

export async function saveSavingsTransactions(txs: SavingsTransaction[]): Promise<void> {
  if (isGuest()) { localSet(KEYS.savingsTxs, txs); return; }
  try {
    await fbSaveSavTxs(txs);
  } catch (e) {
    console.error("Failed to save savings txs to Firestore:", e);
    localSet(KEYS.savingsTxs, txs);
  }
}

export async function loadBudgetLimits(): Promise<BudgetLimit[]> {
  if (isGuest()) return localGet<BudgetLimit>(KEYS.budgetLimits);
  try {
    return await fbLoadBudgetLimits();
  } catch (e) {
    console.error("Failed to load budget limits from Firestore:", e);
    return localGet<BudgetLimit>(KEYS.budgetLimits);
  }
}

export async function saveBudgetLimits(limits: BudgetLimit[]): Promise<void> {
  if (isGuest()) { localSet(KEYS.budgetLimits, limits); return; }
  try {
    await fbSaveBudgetLimits(limits);
  } catch (e) {
    console.error("Failed to save budget limits to Firestore:", e);
    localSet(KEYS.budgetLimits, limits);
  }
}

export async function loadRecurringTransactions(): Promise<RecurringTransaction[]> {
  if (isGuest()) return localGet<RecurringTransaction>(KEYS.recurringTxs);
  try {
    return await fbLoadRecurringTxs();
  } catch (e) {
    console.error("Failed to load recurring transactions from Firestore:", e);
    return localGet<RecurringTransaction>(KEYS.recurringTxs);
  }
}

export async function saveRecurringTransactions(txs: RecurringTransaction[]): Promise<void> {
  if (isGuest()) { localSet(KEYS.recurringTxs, txs); return; }
  try {
    await fbSaveRecurringTxs(txs);
  } catch (e) {
    console.error("Failed to save recurring transactions to Firestore:", e);
    localSet(KEYS.recurringTxs, txs);
  }
}
