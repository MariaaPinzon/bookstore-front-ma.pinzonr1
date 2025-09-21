import { AuthorFormData } from "../authors/validation/authorSchema";
import { fetcher } from "@/app/shared/services/http";

export interface Author {
  id: number;         
  name: string;
  birthDate: string;   
  description: string;
  image: string;       
}

export const createAuthor = (data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>("/api/authors", {
    method: "POST",
    body: JSON.stringify(data), 
  });
};

export const updateAuthor = (id:number, data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>(`/api/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data), 
  });
};


export const deleteAuthor = (id: number): Promise<void> => {
  return fetcher<void>(`/api/authors/${id}`, {
    method: "DELETE",
  });
};
