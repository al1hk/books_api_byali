import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface BookFormProps {
  isEditing: boolean;
  currentBook: Book | null;
  fetchBooks: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ isEditing, currentBook, fetchBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEditing && currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setDescription(currentBook.description);
    }
  }, [isEditing, currentBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = { title, author, description };

    if (isEditing && currentBook) {
      await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBook, id: currentBook.id }),
      });
    } else {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
    }

    fetchBooks();
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  return (
    <div className="bg-purple-400 p-4 rounded mb-10 mt-10 text-black font-mono">
      <h1 className='pt-4 font-bold text-2xl'>Add Your Book or Edit</h1>
      <div className="mt-4" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-white"
          required
        />
        <div className="mt-2" />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded bg-white"
          required
        />
        <div className="mt-2" />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-white"
          required
        ></textarea>
        <div className="mt-2" />
        <div className="flex justify-start">
          <button
            type="submit"
            className="px-4 py-2 bg-white text-purple-700 rounded hover:bg-gray-100"
          >
            {isEditing ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
