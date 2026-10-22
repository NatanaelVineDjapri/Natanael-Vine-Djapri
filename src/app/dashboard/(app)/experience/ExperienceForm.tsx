import { Field, TextareaField } from "@/components/dashboard/Field";
import { buttonClass } from "@/components/dashboard/styles";

type ExperienceRow = {
  id: string;
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
  sort_order: number;
};

export function ExperienceForm({
  item,
  action,
}: {
  item?: ExperienceRow;
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
        <Field label="Periode" name="period" defaultValue={item?.period} required />
        <Field label="Peran / jabatan" name="role" defaultValue={item?.role} required />
        <Field label="Organisasi" name="org" defaultValue={item?.org} required />
        <Field label="Lokasi" name="location" defaultValue={item?.location} required />
      </div>

      <TextareaField label="Deskripsi" name="description" defaultValue={item?.description} rows={5} />

      <button type="submit" className={buttonClass}>
        {item ? "Simpan perubahan" : "Buat entri"}
      </button>
    </form>
  );
}
