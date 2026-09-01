export interface TodoSubtask {
  id: string;
  task: string;
  isCompleted: boolean;
  scheduledTime?: string | null;
  endTime?: string | null;
}

export interface TodoItem {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: string;
  notes: string;
  subtasks: TodoSubtask[];
  priority: "Rendah" | "Sedang" | "Tinggi";
  dueDate?: string | null;
  userId?: string;
  updatedAt?: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  isIncome: boolean;
  notes: string;
  userId?: string;
  updatedAt?: string;
}

export interface SavingsPlan {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  description: string;
  icon: string;
  color: string;
  isCompleted: boolean;
  userId?: string;
  updatedAt?: string;
}

export interface SavingsTransaction {
  id: string;
  planId: string;
  amount: number;
  date: string;
  notes: string;
  userId?: string;
  updatedAt?: string;
}

export interface BudgetLimit {
  id: string;
  category: string;
  amount: number;
  month: string; // "YYYY-MM" format
  userId?: string;
}

export interface RecurringTransaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  isIncome: boolean;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  nextDate: string;
  notes: string;
  isActive: boolean;
  userId?: string;
}
