"use client";

import { useState } from "react";
import ImageDropzone from "./ImageDropzone";
import { inputClass, labelClass } from "./styles";

export function ImagePathField({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required={required}
        className={inputClass}
      />
      <div className="mt-2">
        <ImageDropzone onUploaded={(urls) => setValue(urls[0])} />
      </div>
    </div>
  );
}
