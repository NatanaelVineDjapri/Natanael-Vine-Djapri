import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CertificationForm } from "../../CertificationForm";
import { updateCertification } from "../../actions";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  return (
    <div>
      <p className="font-display text-3xl">Ubah sertifikasi</p>
      <CertificationForm item={item} action={updateCertification.bind(null, item.id)} />
    </div>
  );
}
