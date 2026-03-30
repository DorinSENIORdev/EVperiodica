"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import TodoForm, { emptyTodoForm } from "./TodoForm";
import TodoList from "./TodoList";

const STORAGE_KEY = "evperiodica.todos";

function loadTasks() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function validateTask(form) {
  const nextErrors = {};

  if (!form.title.trim()) {
    nextErrors.title = "Titlul este obligatoriu.";
  }

  if (form.description.trim().length < 10) {
    nextErrors.description = "Descrierea trebuie sa aiba cel putin 10 caractere.";
  }

  if (!form.deadline) {
    nextErrors.deadline = "Deadline-ul este obligatoriu.";
  }

  return nextErrors;
}

function normalizeTask(form) {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
    deadline: form.deadline,
  };
}

function matchesStatus(task, statusFilter) {
  return statusFilter === "toate" ? true : task.status === statusFilter;
}

function matchesSearch(task, query) {
  if (!query.trim()) {
    return true;
  }

  const searchValue = query.trim().toLowerCase();

  return (
    task.title.toLowerCase().includes(searchValue) ||
    task.description.toLowerCase().includes(searchValue)
  );
}

function compareTasks(left, right, sortBy) {
  if (sortBy === "recent") {
    return right.createdAt.localeCompare(left.createdAt);
  }

  if (sortBy === "status") {
    return left.status.localeCompare(right.status);
  }

  if (sortBy === "deadline-desc") {
    return right.deadline.localeCompare(left.deadline);
  }

  return left.deadline.localeCompare(right.deadline);
}

export default function TodoApp() {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [tasks, setTasks] = useState(() => loadTasks());
  const [form, setForm] = useState(emptyTodoForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("toate");
  const [sortBy, setSortBy] = useState("deadline-asc");

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [isHydrated, tasks]);

  const filteredTasks = tasks
    .filter((task) => matchesStatus(task, statusFilter))
    .filter((task) => matchesSearch(task, query))
    .sort((left, right) => compareTasks(left, right, sortBy));

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.status === "finalizat").length;
  const pendingCount = tasks.filter((task) => task.status !== "finalizat").length;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function resetForm() {
    setForm(emptyTodoForm);
    setErrors({});
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateTask(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const normalizedTask = normalizeTask(form);

    if (editingId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingId ? { ...task, ...normalizedTask } : task
        )
      );
    } else {
      const timestamp = new Date().toISOString();

      setTasks((currentTasks) => [
        {
          id: crypto.randomUUID().slice(0, 8),
          createdAt: timestamp,
          ...normalizedTask,
        },
        ...currentTasks,
      ]);
    }

    resetForm();
  }

  function handleEdit(task) {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
    });
    setErrors({});
  }

  function handleDelete(taskId) {
    const confirmed = window.confirm(
      "Esti sigur ca vrei sa stergi acest task?"
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (editingId === taskId) {
      resetForm();
    }
  }

  if (!isHydrated) {
    return (
      <main className="min-h-screen px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/50 bg-white/70 px-6 py-12 shadow-[0_35px_120px_rgba(15,23,42,0.12)] backdrop-blur md:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            EVperiodica To Do App
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-5xl">
            Se incarca task-urile salvate local...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-white/50 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,118,110,0.9),rgba(255,255,255,0.72))] px-6 py-8 text-white shadow-[0_35px_120px_rgba(15,23,42,0.18)] md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
                Evaluare periodica
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                  To Do App 
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-100/86 md:text-lg">
                  Adaugi, editezi, stergi si filtrezi task-uri
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-200">
                  Total
                </p>
                <p className="mt-3 text-4xl font-semibold">{totalCount}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-200">
                  In lucru
                </p>
                <p className="mt-3 text-4xl font-semibold">{pendingCount}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-200">
                  Finalizate
                </p>
                <p className="mt-3 text-4xl font-semibold">{completedCount}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.25fr]">
          <TodoForm
            form={form}
            errors={errors}
            isEditing={Boolean(editingId)}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />

          <TodoList
            tasks={filteredTasks}
            query={query}
            statusFilter={statusFilter}
            sortBy={sortBy}
            onQueryChange={setQuery}
            onStatusFilterChange={setStatusFilter}
            onSortChange={setSortBy}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
}
