"use client";

const statusStyles = {
  "de-facut": "bg-amber-100 text-amber-800",
  "in-progres": "bg-sky-100 text-sky-800",
  finalizat: "bg-emerald-100 text-emerald-800",
};

const statusLabels = {
  "de-facut": "De facut",
  "in-progres": "In progres",
  finalizat: "Finalizat",
};

function formatDate(value) {
  if (!value) {
    return "Fara data";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function TodoList({
  tasks,
  query,
  statusFilter,
  sortBy,
  onQueryChange,
  onStatusFilterChange,
  onSortChange,
  onEdit,
  onDelete,
}) {
  return (
    <section className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_35px_100px_rgba(15,23,42,0.18)] md:p-8">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-300">
            Lista task-uri
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Organizeaza si actualizeaza</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Cauta dupa titlu sau descriere"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-300"
          />

          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
          >
            <option value="toate">Toate statusurile</option>
            <option value="de-facut">De facut</option>
            <option value="in-progres">In progres</option>
            <option value="finalizat">Finalizat</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
          >
            <option value="deadline-asc">Deadline apropiat</option>
            <option value="deadline-desc">Deadline indepartat</option>
            <option value="status">Sortare dupa status</option>
            <option value="recent">Cele mai noi</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center text-slate-300">
            Nu exista task-uri care sa corespunda filtrelor selectate.
          </div>
        ) : null}

        {tasks.map((task) => (
          <article
            key={task.id}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${statusStyles[task.status]}`}
                  >
                    {statusLabels[task.status]}
                  </span>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span>Deadline: {formatDate(task.deadline)}</span>
                  <span>ID: {task.id}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="rounded-full border border-sky-300/50 px-4 py-2 text-sm font-medium text-sky-200 transition hover:border-sky-300 hover:text-white"
                >
                  Editeaza
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="rounded-full border border-rose-300/40 px-4 py-2 text-sm font-medium text-rose-200 transition hover:border-rose-300 hover:text-white"
                >
                  Sterge
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
