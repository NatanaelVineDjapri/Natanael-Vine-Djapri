import { getProfile } from "@/lib/data/profile";
import { Field, TextareaField } from "@/components/dashboard/Field";
import { ImagePathField } from "@/components/dashboard/ImagePathField";
import { buttonClass, labelClass, inputClass } from "@/components/dashboard/styles";
import { updateProfile } from "./actions";

export default async function DashboardProfilePage() {
  const profile = await getProfile();
  const socialRows = Array.from(
    { length: 6 },
    (_, i) => profile.socials[i] ?? { label: "", handle: "", url: "" },
  );

  return (
    <div>
      <p className="font-display text-3xl">Profil</p>
      <p className="text-mute mt-2 text-sm">
        Satu baris data, ditampilkan di seluruh situs publik.
      </p>

      <form action={updateProfile} className="mt-10 max-w-2xl space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nama lengkap" name="name" defaultValue={profile.name} required />
          <Field label="Inisial" name="initials" defaultValue={profile.initials} required />
          <Field label="Nama depan" name="first_name" defaultValue={profile.firstName} required />
          <Field label="Nama belakang" name="last_name" defaultValue={profile.lastName} required />
          <Field label="Peran / jabatan" name="role" defaultValue={profile.role} required />
          <Field label="Jurusan" name="discipline" defaultValue={profile.discipline} required />
          <Field label="Lokasi" name="location" defaultValue={profile.location} required />
          <Field label="Zona waktu" name="timezone" defaultValue={profile.timezone} required />
          <Field label="Email" name="email" type="email" defaultValue={profile.email} required />
          <Field label="Teks ketersediaan" name="available" defaultValue={profile.available} required />
          <Field label="URL resume/CV" name="resume_url" defaultValue={profile.resumeUrl} required />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ImagePathField label="Foto — bagian Tentang" name="photo_home" defaultValue={profile.photoHome} required />
          <ImagePathField label="Foto — lanyard badge" name="photo_lanyard" defaultValue={profile.photoLanyard} required />
        </div>

        <TextareaField label="Intro (tagline hero)" name="intro" defaultValue={profile.intro} rows={3} />
        <TextareaField
          label="Bio"
          name="bio"
          defaultValue={profile.bio.join("\n\n")}
          rows={8}
          hint="Satu paragraf per baris kosong."
        />

        <div>
          <label className={labelClass}>Media sosial</label>
          <div className="mt-2 space-y-3">
            {socialRows.map((social, i) => (
              <div key={i} className="grid grid-cols-3 gap-3">
                <input
                  name={`social_label_${i}`}
                  defaultValue={social.label}
                  placeholder="Label (cth. GitHub)"
                  className={inputClass}
                />
                <input
                  name={`social_handle_${i}`}
                  defaultValue={social.handle}
                  placeholder="Handle"
                  className={inputClass}
                />
                <input
                  name={`social_url_${i}`}
                  defaultValue={social.url}
                  placeholder="URL"
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={buttonClass}>
          Simpan perubahan
        </button>
      </form>
    </div>
  );
}
