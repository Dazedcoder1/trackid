import clsx from "clsx";

export default function FormField({
  field,
  value,
  error,
  onChange,
}) {
  const baseClasses = clsx(
    "w-full rounded-2xl border bg-white/80 px-5 py-4",
    "text-ink placeholder:text-slate/60",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
    error
      ? "border-red-400"
      : "border-gold/20 hover:border-gold/40"
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className="block font-medium text-ink"
      >
        {field.label}

        {field.required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {/* TEXTAREA */}

      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={5}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      ) : field.type === "select" ? (
        /* SELECT */

        <select
          id={field.name}
          name={field.name}
          value={value || ""}
          onChange={onChange}
          className={baseClasses}
        >
          <option value="">
            Select an option
          </option>

          {field.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        /* INPUT */

        <input
          id={field.name}
          name={field.name}
          type={field.type}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}