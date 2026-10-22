import { ExperienceForm } from "../ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div>
      <p className="font-display text-3xl">Pengalaman baru</p>
      <ExperienceForm action={createExperience} />
    </div>
  );
}
