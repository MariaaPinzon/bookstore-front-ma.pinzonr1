'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/app/authors/validation/authorSchema";


interface AuthorFormProps {
  onSubmit: SubmitHandler<AuthorFormData>;
  defaultValues?: AuthorFormData;
  isSubmitting: boolean;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting,}:
  
  AuthorFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <div className=" flex flex-col">

      <div className="flex-1" />

      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} 
              className="author-form"
              >
          <div>
            <label htmlFor="name" className="block font-medium">
              Author Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="form-input"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="birthDate"className="block font-medium">
              Birth date
            </label>
            <input
              type="date"
              id="birthDate"
              {...register("birthDate")}
                className="form-input"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <input
              id="description"
              {...register("description")}
              className="form-input"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
              <label htmlFor="image" className="block font-medium">Image URL</label>
              <input
                type="url"
                id="image"
                {...register("image")}
                className="form-input"
                placeholder="https://example.com/photo.jpg"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-save"
          >
            {isSubmitting ? "Saving..." : "Save Author"}
          </button>
        </form>
        </div>

      <div className="flex-1" />

    </div>
  );
}