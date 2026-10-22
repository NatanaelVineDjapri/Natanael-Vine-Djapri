"use client";

import { ghostButtonClass } from "./styles";

export default function DeleteButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm("Yakin mau hapus ini? Gak bisa dibalikin lagi.")) event.preventDefault();
      }}
    >
      <button type="submit" className={`${ghostButtonClass} hover:text-red-400`}>
        Hapus
      </button>
    </form>
  );
}
