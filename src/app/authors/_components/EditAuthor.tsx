'use client'

import { useState } from "react";
import AuthorForm from "../ui/CreateAuthorForm"; 
import type { Author } from "@/app/api/authors";
import { updateAuthor } from "@/app/api/authors";
import type { AuthorFormData } from "../validation/authorSchema";

interface EditAuthorProps {
  author: Author ;              
  open: boolean;                  
  onClose: () => void;                 
  onUpdated: (updated: Author) => void;
}

export default function EditAuthor({author,onClose,onUpdated,}: EditAuthorProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = async (form: AuthorFormData) => {
    if (!author) return;
    try {
      setIsSaving(true);
      const updated = await updateAuthor(author.id, form);
      onUpdated(updated);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-gray text-white rounded-xl p-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Editar: {author.name}</h2>
          <button onClick={onClose} className="text-sm px-3 py-1 rounded border">
            Cerrar
          </button>
        </div>

        <AuthorForm
          onSubmit={handleUpdate}
          isSubmitting={isSaving}
          defaultValues={{
            name: author.name,
            birthDate: author.birthDate,
            description: author.description,
            image: author.image,
          }}
        />
      </div>
    </div>
  );
}
