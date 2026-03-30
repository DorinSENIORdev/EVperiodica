"use client";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "de-facut",
  deadline: "",
};

export const emptyTodoForm = EMPTY_FORM;

export default function TodoForm({
  form,
  errors,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">
            Formular task
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {isEditing ? "Editeaza task-ul" : "Adauga un task nou"}
          </h2>
        </div>
        {isEditing ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
          >
            Renunta
          </button>
        ) : null}
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="title">
            Titlu
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            placeholder="Ex: Finalizeaza proiectul la DAW"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
          />
          {errors.title ? (
            <p className="text-sm text-rose-600">{errors.title}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="description"
          >
            Descriere
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={onChange}
            placeholder="Descrie pe scurt ce trebuie facut."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
          />
          {errors.description ? (
            <p className="text-sm text-rose-600">{errors.description}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              <option value="de-facut">De facut</option>
              <option value="in-progres">In progres</option>
              <option value="finalizat">Finalizat</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="deadline"
            >
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
            {errors.deadline ? (
              <p className="text-sm text-rose-600">{errors.deadline}</p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {isEditing ? "Salveaza modificarile" : "Adauga task"}
        </button>
      </form>
    </section>
  );
}
