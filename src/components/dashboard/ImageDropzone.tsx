"use client";

import { useRef, useState, type DragEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "images";

type FileStatus = {
  name: string;
  status: "uploading" | "done" | "error";
  message?: string;
};

function sanitize(filename: string) {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "-");
}

async function uploadOne(file: File): Promise<string> {
  const supabase = createClient();
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${sanitize(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Drag-and-drop (or click-to-browse) uploader. Doesn't own any form state
 * itself — just uploads whatever files it's given to Supabase Storage and
 * reports back the resulting public URLs. `ImagePathField`/`GalleryField`
 * wrap this with the actual text input/textarea the form submits.
 */
export default function ImageDropzone({
  multiple = false,
  onUploaded,
}: {
  multiple?: boolean;
  onUploaded: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<FileStatus[]>([]);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const list = Array.from(fileList);

    setFiles((prev) => [...prev, ...list.map((f) => ({ name: f.name, status: "uploading" as const }))]);

    const results = await Promise.allSettled(list.map(uploadOne));
    const urls: string[] = [];

    setFiles((prev) =>
      prev.map((entry) => {
        const index = list.findIndex((f) => f.name === entry.name);
        if (index === -1 || entry.status !== "uploading") return entry;
        const result = results[index];
        if (result.status === "fulfilled") {
          urls.push(result.value);
          return { ...entry, status: "done" as const };
        }
        return { ...entry, status: "error" as const, message: result.reason?.message };
      }),
    );

    if (urls.length > 0) onUploaded(urls);
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event: DragEvent) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event: DragEvent) => {
          event.preventDefault();
          setDragOver(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`border-line cursor-pointer border border-dashed px-4 py-6 text-center transition-colors ${
          dragOver ? "border-mute bg-ink-2" : "hover:border-mute"
        }`}
      >
        <p className="text-mute font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
          Drop {multiple ? "gambar-gambar" : "gambar"} di sini, atau klik buat pilih
          {multiple ? " (bisa banyak sekaligus)" : ""}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(event) => {
            handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {files.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {files.map((file, i) => (
            <li key={i} className="flex items-center gap-2 font-mono text-xs">
              <span
                className={
                  file.status === "done"
                    ? "text-green-400"
                    : file.status === "error"
                      ? "text-red-400"
                      : "text-mute"
                }
              >
                {file.status === "done" ? "✓" : file.status === "error" ? "✗" : "…"}
              </span>
              <span className="text-mute truncate">{file.name}</span>
              {file.message ? <span className="text-red-400">({file.message})</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
