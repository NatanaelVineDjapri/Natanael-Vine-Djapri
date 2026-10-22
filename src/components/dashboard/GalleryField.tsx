"use client";

import { useState } from "react";
import ImageDropzone from "./ImageDropzone";
import { inputClass, labelClass } from "./styles";

export function GalleryField({
  label,
  name,
  defaultValue,
  rows = 6,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <p className="text-mute -mt-1 mb-2 text-xs">
        Satu path gambar per baris — urutan di sini jadi urutan di galeri publik.
      </p>
      <textarea
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={rows}
        className={inputClass}
      />
      <div className="mt-2">
        <ImageDropzone
          multiple
          onUploaded={(urls) =>
            setValue((current) => (current ? `${current}\n${urls.join("\n")}` : urls.join("\n")))
          }
        />
      </div>
    </div>
  );
}
