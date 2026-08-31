"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { loadTodos, saveTodos } from "@/lib/data-service";
import type { TodoItem, TodoSubtask } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  Plus, Trash2, ChevronDown, ChevronUp, Calendar,
  CheckCircle2, Circle, Search, StickyNote,
} from "lucide-react";

const PRIORITIES = ["Rendah", "Sedang", "Tinggi"] as const;
const PRIORITY_COLORS: Record<string, string> = {
  Tinggi: "bg-red-100 text-red-700 border-red-200",
  Sedang: "bg-orange-100 text-orange-700 border-orange-200",
  Rendah: "bg-green-100 text-green-700 border-green-200",
};

export default function TodosPage() {
  const { user, isGuest } = useAuth();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const persist = useCallback(async (items: TodoItem[]) => {
    setSaving(true);
    try {
      await saveTodos(items);
    } catch (e) {
      console.error("Gagal menyimpan tugas:", e);
    }
    setSaving(false);
  }, []);

  useEffect(() => {
    if (!user && !isGuest) return;
    loadTodos()
      .then((data) => { setTodos(data); setLoading(false); })
      .catch((e) => { console.error("Gagal memuat tugas:", e); setLoading(false); });
  }, [user, isGuest]);

  const addTodo = (todo: TodoItem) => {
    const updated = [todo, ...todos];
    setTodos(updated);
    persist(updated);
    setShowAdd(false);
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map((t) => {
      if (t.id !== id) return t;
      const done = !t.isCompleted;
      return { ...t, isCompleted: done, subtasks: t.subtasks.map((s) => ({ ...s, isCompleted: done })) };
    });
    setTodos(updated);
    persist(updated);
  };

  const toggleSub = (todoId: string, subId: string) => {
    const updated = todos.map((t) => {
      if (t.id !== todoId) return t;
      const subs = t.subtasks.map((s) => s.id === subId ? { ...s, isCompleted: !s.isCompleted } : s);
      const allDone = subs.length > 0 && subs.every((s) => s.isCompleted);
      return { ...t, subtasks: subs, isCompleted: allDone };
    });
    setTodos(updated);
    persist(updated);
  };

  const deleteTodo = (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    persist(updated);
  };

  const updateNotes = (id: string, notes: string) => {
    const updated = todos.map((t) => t.id === id ? { ...t, notes } : t);
    setTodos(updated);
    persist(updated);
  };

  const filtered = todos.filter((t) => {
    if (filter === "active" && t.isCompleted) return false;
    if (filter === "completed" && !t.isCompleted) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (search && !t.task.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = todos.filter((t) => !t.isCompleted).length;
  const doneCount = todos.filter((t) => t.isCompleted).length;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tugas</h1>
          <p className="text-sm text-gray-500">
            {activeCount} aktif, {doneCount} selesai
            {saving && <span className="ml-2 text-indigo-500">Menyimpan...</span>}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Tambah Tugas
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari tugas..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-300 bg-white p-0.5">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === f ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f === "all" ? "Semua" : f === "active" ? "Aktif" : "Selesai"}
              </button>
            ))}
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">Semua Prioritas</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 py-16">
          <CheckCircle2 className="h-12 w-12 text-gray-300" />
          <p className="mt-3 text-gray-500">
            {todos.length === 0 ? "Belum ada tugas. Klik + untuk menambah." : "Tidak ada tugas yang cocok."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              expanded={expandedId === todo.id}
              onToggle={() => toggleTodo(todo.id)}
              onToggleSub={(subId) => toggleSub(todo.id, subId)}
              onDelete={() => deleteTodo(todo.id)}
              onExpand={() => setExpandedId(expandedId === todo.id ? null : todo.id)}
              onUpdateNotes={(notes) => updateNotes(todo.id, notes)}
              onAddSubtask={(sub) => {
                const updated = todos.map((t) => t.id === todo.id ? { ...t, subtasks: [...t.subtasks, sub] } : t);
                setTodos(updated);
                persist(updated);
              }}
              onEditSubtask={(subId, data) => {
                const updated = todos.map((t) => t.id === todo.id ? { ...t, subtasks: t.subtasks.map((s) => s.id === subId ? { ...s, ...data } : s) } : t);
                setTodos(updated);
                persist(updated);
              }}
              onDeleteSubtask={(subId) => {
                const updated = todos.map((t) => t.id === todo.id ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== subId) } : t);
                setTodos(updated);
                persist(updated);
              }}
            />
          ))}
        </div>
      )}

      {showAdd && <AddTodoDialog onAdd={addTodo} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function TodoCard({
  todo, expanded, onToggle, onToggleSub, onDelete, onExpand, onUpdateNotes, onAddSubtask, onEditSubtask, onDeleteSubtask,
}: {
  todo: TodoItem; expanded: boolean;
  onToggle: () => void; onToggleSub: (id: string) => void; onDelete: () => void; onExpand: () => void;
  onUpdateNotes: (n: string) => void; onAddSubtask: (s: TodoSubtask) => void;
  onEditSubtask: (id: string, d: Partial<TodoSubtask>) => void; onDeleteSubtask: (id: string) => void;
}) {
  const [notes, setNotes] = useState(todo.notes);
  const [newSub, setNewSub] = useState("");
  const [editSubId, setEditSubId] = useState<string | null>(null);
  const [editSubText, setEditSubText] = useState("");

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.isCompleted;

  const addSubtask = () => {
    if (!newSub.trim()) return;
    onAddSubtask({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      task: newSub.trim(),
      isCompleted: false,
    });
    setNewSub("");
  };

  return (
    <div className={`rounded-xl border bg-white shadow-sm transition-all ${isOverdue ? "border-red-300" : "border-gray-200"}`}>
      <div className="flex items-start gap-3 p-4">
        <button onClick={onToggle} className="mt-0.5 shrink-0">
          {todo.isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-300 hover:text-indigo-500" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-medium ${todo.isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}>
              {todo.task}
            </p>
            <div className="flex shrink-0 items-center gap-1">
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${PRIORITY_COLORS[todo.priority] || ""}`}>
                {todo.priority}
              </span>
              {todo.subtasks.length > 0 && (
                <span className="text-[10px] text-gray-400">{todo.subtasks.filter((s) => s.isCompleted).length}/{todo.subtasks.length}</span>
              )}
            </div>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            {todo.dueDate && (
              <span className={`flex items-center gap-1 ${isOverdue ? "text-red-500 font-medium" : ""}`}>
                <Calendar className="h-3 w-3" /> {formatDate(new Date(todo.dueDate))}
                {isOverdue && " (terlambat)"}
              </span>
            )}
            {todo.subtasks.length > 0 && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {todo.subtasks.filter((s) => s.isCompleted).length}/{todo.subtasks.length} subtask
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button onClick={onExpand} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <button onClick={onDelete} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t px-4 py-3 space-y-3">
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-500">
              <StickyNote className="h-3 w-3" /> Catatan
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => onUpdateNotes(notes)}
              placeholder="Tambah catatan..."
              className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-indigo-500 focus:outline-none"
              rows={2}
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-500">
              <CheckCircle2 className="h-3 w-3" /> Subtask
            </label>
            <div className="space-y-1">
              {todo.subtasks.map((s) => (
                <div key={s.id} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                  <button onClick={() => onToggleSub(s.id)}>
                    {s.isCompleted ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-gray-300" />}
                  </button>
                  {editSubId === s.id ? (
                    <input
                      autoFocus
                      value={editSubText}
                      onChange={(e) => setEditSubText(e.target.value)}
                      onBlur={() => { if (editSubText.trim()) onEditSubtask(s.id, { task: editSubText.trim() }); setEditSubId(null); }}
                      onKeyDown={(e) => { if (e.key === "Enter") { if (editSubText.trim()) onEditSubtask(s.id, { task: editSubText.trim() }); setEditSubId(null); }}}
                      className="flex-1 rounded border border-indigo-300 px-2 py-0.5 text-sm focus:outline-none"
                    />
                  ) : (
                    <span
                      onDoubleClick={() => { setEditSubId(s.id); setEditSubText(s.task); }}
                      className={`flex-1 text-sm ${s.isCompleted ? "text-gray-400 line-through" : "text-gray-700"}`}
                    >
                      {s.task}
                    </span>
                  )}
                  <button onClick={() => onDeleteSubtask(s.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                value={newSub}
                onChange={(e) => setNewSub(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                placeholder="Tambah subtask..."
                className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <button onClick={addSubtask} className="rounded-lg bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200">
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddTodoDialog({ onAdd, onClose }: { onAdd: (t: TodoItem) => void; onClose: () => void }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState<string>("Sedang");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      task: task.trim(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
      notes,
      subtasks: [],
      priority: priority as "Rendah" | "Sedang" | "Tinggi",
      dueDate: dueDate || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold text-gray-900">Tambah Tugas Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Judul Tugas</label>
            <input
              autoFocus
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Masukkan judul tugas..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
              >
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Catatan</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Catatan opsional..."
              rows={2}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
