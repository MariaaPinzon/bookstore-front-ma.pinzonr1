import { z } from "zod";

export const authorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),

  birthDate: z
    .string()
    .min(1, { message: "Birth date is required." })
    .refine(
    (v) => !Number.isNaN(Date.parse(v)),
    { message: "Birth date must be a valid date (YYYY-MM-DD)." }
    ),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),

  image: z
    .string()
    .url({ message: "Image must be a valid URL." }),
});

export type AuthorFormData = z.infer<typeof authorSchema>;