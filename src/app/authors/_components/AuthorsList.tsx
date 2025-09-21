'use client'
import { useEffect, useState } from "react";
import {Author} from '../../api/authors'
import Image from 'next/image'
import EditAuthor from "./EditAuthor";
import { deleteAuthor } from "../../api/authors";

// rafc 

import React from 'react'

export const AuthorsList = () => {

  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const [editing, setEditing] = useState<Author | null>(null);

    useEffect(() => {
    const loadAuthors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/authors");
        const data = await response.json();
        setAuthors(data); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthors();
  }, []); 

  const handleUpdated = (updated: Author) => {
    setAuthors(prev => prev.map(author => (author.id === updated.id ? updated : author)));
    setEditing(null);
  };
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("¿Desea eliminar este autor?");
    if (!confirm) return;
    try {
      setIsDeleting(id);
      await deleteAuthor(id);
      setAuthors(prev => prev.filter(a => a.id !== id));
      if (editing?.id === id) setEditing(null);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="container mx-auto p-8" >
        <h1 className="text-3xl font-bold mb-6 text-center">Autores</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "> 
            {authors.map((author)=>(
              <li key={author.id} className="p-4 border rounded-lg shadow-sm text-center">
                    <h2 className="text-xl font-semibold">{author.name}</h2>

                    <div className="flex justify-center">
                      <Image
                        src={author.image}
                        alt={author.name}
                        width={150}
                        height={150}
                        className="mt-2 rounded"
                      />
                    </div>

                    <p className="text-sm mt-2">{author.birthDate}</p>
                    <p className="mt-2">{author.description}</p>

                    <div className="buttons-container">
                        <button
                          onClick={() => setEditing(author)}
                          className="btn-edit"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(author.id)}
                          disabled={isDeleting === author.id}
                          className="btn-delete"
                        >
                          {isDeleting === author.id ? "Eliminando..." : "Eliminar"}
                        </button>
                      </div>

                    
                </li>
                
            ))}

        </ul>
        {editing && (
        <EditAuthor
          author={editing}
          open={true}
          onClose={() => setEditing(null)}
          onUpdated={handleUpdated}
        />
        )}
        


    </div>
  )
}
