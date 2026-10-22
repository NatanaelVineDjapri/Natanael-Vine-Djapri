import { Field, TextareaField } from "@/components/dashboard/Field";
import { ImagePathField } from "@/components/dashboard/ImagePathField";
import { buttonClass } from "@/components/dashboard/styles";

type CertificationRow = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  image: string | null;
  credential_id: string | null;
  description: string;
  url: string | null;
  sort_order: number;
};

export function CertificationForm({
  item,
  action,
}: {
  item?: CertificationRow;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="mt-10 max-w-2xl space-y-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="ID (unik, mirip slug)" name="id" defaultValue={item?.id} required />
        <Field
          label="Urutan"
          name="sort_order"
          type="number"
          defaultValue={item?.sort_order ?? 0}
          required
        />
        <Field label="Judul" name="title" defaultValue={item?.title} required />
        <Field label="Penerbit" name="issuer" defaultValue={item?.issuer} required />
        <Field label="Tahun" name="year" defaultValue={item?.year} required />
        <Field
          label="Kategori (Learning / Volunteering / Award)"
          name="category"
          defaultValue={item?.category}
          required
        />
        <Field label="ID kredensial" name="credential_id" defaultValue={item?.credential_id ?? ""} />
        <Field label="URL verifikasi" name="url" defaultValue={item?.url ?? ""} />
      </div>

      <ImagePathField label="Gambar sertifikat" name="image" defaultValue={item?.image ?? ""} />

      <TextareaField label="Deskripsi" name="description" defaultValue={item?.description} rows={4} />

      <button type="submit" className={buttonClass}>
        {item ? "Simpan perubahan" : "Buat entri"}
      </button>
    </form>
  );
}
