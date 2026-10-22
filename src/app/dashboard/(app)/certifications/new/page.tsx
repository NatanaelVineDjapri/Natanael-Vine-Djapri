import { CertificationForm } from "../CertificationForm";
import { createCertification } from "../actions";

export default function NewCertificationPage() {
  return (
    <div>
      <p className="font-display text-3xl">Sertifikasi baru</p>
      <CertificationForm action={createCertification} />
    </div>
  );
}
