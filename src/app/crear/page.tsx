'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "../authors/ui/CreateAuthorForm";
import { AuthorFormData } from "../authors/validation/authorSchema";
import { createAuthor } from "@/app/api/authors"; 

export default function CreateAuthorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createAuthor(data);
      router.push("/authors");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the service."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Crear Nuevo Autor</h1>
      <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
    </div>
  );
}