'use client';  

import { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;  
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const handleEdit = (book: Book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentBook(null);
  };

  return (
    <div className="container mx-auto p-6 bg-purple-700">
      <h1 className="text-4xl font-mono font-bold mb-6 text-center">Books Collection</h1>
      
      <BookList books={books} onEdit={handleEdit} fetchBooks={fetchBooks} />
      <BookForm
        isEditing={isEditing}
        currentBook={currentBook}
        fetchBooks={fetchBooks}
      />
    </div>
  );
}
