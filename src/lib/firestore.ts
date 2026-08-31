import {
  collection, doc, getDocs, writeBatch,
  query, orderBy, serverTimestamp
} from "firebase/firestore";
import { db, auth } from "./firebase";
import type { TodoItem, Transaction, SavingsPlan, SavingsTransaction, BudgetLimit, RecurringTransaction } from "./types";

function getUserCollection(subcollection: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  return collection(db, "users", uid, subcollection);
}

// --- Todos ---
export async function loadTodos(): Promise<TodoItem[]> {
  const snap = await getDocs(query(getUserCollection("todos"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TodoItem));
}

export async function saveTodos(todos: TodoItem[]) {
  const batch = writeBatch(db);
  const old = await getDocs(getUserCollection("todos"));
  old.docs.forEach((d) => batch.delete(d.ref));
  for (const t of todos) {
    const ref = doc(getUserCollection("todos"), t.id);
    batch.set(ref, { ...t, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}

// --- Transactions ---
export async function loadTransactions(): Promise<Transaction[]> {
  const snap = await getDocs(query(getUserCollection("transactions"), orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
}

export async function saveTransactions(txs: Transaction[]) {
  const batch = writeBatch(db);
  const old = await getDocs(getUserCollection("transactions"));
  old.docs.forEach((d) => batch.delete(d.ref));
  for (const t of txs) {
    const ref = doc(getUserCollection("transactions"), t.id);
    batch.set(ref, { ...t, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}

// --- Savings Plans ---
export async function loadSavingsPlans(): Promise<SavingsPlan[]> {
  const snap = await getDocs(query(getUserCollection("savings_plans"), orderBy("targetDate", "asc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SavingsPlan));
}

export async function saveSavingsPlans(plans: SavingsPlan[]) {
  const batch = writeBatch(db);
  const old = await getDocs(getUserCollection("savings_plans"));
  old.docs.forEach((d) => batch.delete(d.ref));
  for (const p of plans) {
    const ref = doc(getUserCollection("savings_plans"), p.id);
    batch.set(ref, { ...p, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}

// --- Savings Transactions ---
export async function loadSavingsTransactions(): Promise<SavingsTransaction[]> {
  const snap = await getDocs(query(getUserCollection("savings_transactions"), orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SavingsTransaction));
}

export async function saveSavingsTransactions(txs: SavingsTransaction[]) {
  const batch = writeBatch(db);
  const old = await getDocs(getUserCollection("savings_transactions"));
  old.docs.forEach((d) => batch.delete(d.ref));
  for (const t of txs) {
    const ref = doc(getUserCollection("savings_transactions"), t.id);
    batch.set(ref, { ...t, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}

// --- Budget Limits ---
export async function loadBudgetLimits(): Promise<BudgetLimit[]> {
  const snap = await getDocs(query(getUserCollection("budget_limits")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BudgetLimit));
}

export async function saveBudgetLimits(limits: BudgetLimit[]) {
  const batch = writeBatch(db);
  const old = await getDocs(getUserCollection("budget_limits"));
  old.docs.forEach((d) => batch.delete(d.ref));
  for (const l of limits) {
    const ref = doc(getUserCollection("budget_limits"), l.id);
    batch.set(ref, { ...l, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}

// --- Recurring Transactions ---
export async function loadRecurringTransactions(): Promise<RecurringTransaction[]> {
  const snap = await getDocs(getUserCollection("recurring_transactions"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as RecurringTransaction));
}

export async function saveRecurringTransactions(txs: RecurringTransaction[]) {
  const batch = writeBatch(db);
  const old = await getDocs(getUserCollection("recurring_transactions"));
  old.docs.forEach((d) => batch.delete(d.ref));
  for (const t of txs) {
    const ref = doc(getUserCollection("recurring_transactions"), t.id);
    batch.set(ref, { ...t, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}
