import { inputClass, labelClass } from "./styles";

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  rows = 4,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {hint ? <p className="text-mute -mt-1 mb-2 text-xs">{hint}</p> : null}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className={inputClass}
      />
    </div>
  );
}
