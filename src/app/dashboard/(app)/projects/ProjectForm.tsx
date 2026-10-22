import { Field, TextareaField } from "@/components/dashboard/Field";
import { ImagePathField } from "@/components/dashboard/ImagePathField";
import { GalleryField } from "@/components/dashboard/GalleryField";
import { buttonClass } from "@/components/dashboard/styles";

type ProjectRow = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  stack: string[];
  contributions: string[];
  cover: string | null;
  gallery: string[] | null;
  web_url: string | null;
  youtube_url: string | null;
  repo_url: string | null;
  docs_url: string | null;
  featured: boolean;
  sort_order: number;
};

export function ProjectForm({
  project,
  action,
}: {
  project?: ProjectRow;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="mt-10 max-w-2xl space-y-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={project?.slug} required />
        <Field label="Index (nomor tampilan)" name="index" defaultValue={project?.index} required />
        <Field label="Judul" name="title" defaultValue={project?.title} required />
        <Field label="Kategori" name="category" defaultValue={project?.category} required />
        <Field label="Tahun" name="year" defaultValue={project?.year} required />
        <Field label="Peran" name="role" defaultValue={project?.role} required />
        <Field
          label="Urutan"
          name="sort_order"
          type="number"
          defaultValue={project?.sort_order ?? 0}
          required
        />
      </div>

      <ImagePathField label="Gambar cover" name="cover" defaultValue={project?.cover ?? ""} />

      <TextareaField label="Ringkasan" name="summary" defaultValue={project?.summary} rows={3} />
      <TextareaField
        label="Deskripsi"
        name="description"
        defaultValue={project?.description?.join("\n\n")}
        rows={6}
        hint="Satu paragraf per baris kosong."
      />
      <TextareaField
        label="Stack / teknologi"
        name="stack"
        defaultValue={project?.stack?.join("\n")}
        rows={4}
        hint="Satu teknologi per baris."
      />
      <TextareaField
        label="Kontribusi"
        name="contributions"
        defaultValue={project?.contributions?.join("\n")}
        rows={4}
        hint="Satu poin per baris."
      />

      <GalleryField
        label="Galeri gambar"
        name="gallery"
        defaultValue={project?.gallery?.join("\n")}
        rows={6}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="URL website" name="web_url" defaultValue={project?.web_url ?? ""} />
        <Field label="URL YouTube" name="youtube_url" defaultValue={project?.youtube_url ?? ""} />
        <Field label="URL repository" name="repo_url" defaultValue={project?.repo_url ?? ""} />
        <Field label="URL dokumentasi" name="docs_url" defaultValue={project?.docs_url ?? ""} />
      </div>

      <label className="flex items-center gap-3 font-mono text-xs tracking-[0.08em] uppercase">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="accent-paper size-4"
        />
        Unggulan
      </label>

      <button type="submit" className={buttonClass}>
        {project ? "Simpan perubahan" : "Buat proyek"}
      </button>
    </form>
  );
}
