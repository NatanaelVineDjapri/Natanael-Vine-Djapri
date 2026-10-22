import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <p className="font-display text-3xl">Proyek baru</p>
      <ProjectForm action={createProject} />
    </div>
  );
}
