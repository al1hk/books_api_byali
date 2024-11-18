interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
  }
  
  interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    fetchBooks: () => void;
  }
  
  const BookList: React.FC<BookListProps> = ({ books, onEdit, fetchBooks }) => {
    const handleDelete = async (id: number) => {
      await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      // Reload the page to reflect the changes
      window.location.reload();
    };
  
    return (
      <ul className="space-y-6">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex flex-col justify-between items-start p-6 bg-purple-400 rounded shadow-md font-mono"
          >
            <div className="text-2xl font-semibold">
              {book.title} by {book.author}
            </div>
            <p className="text-base text-white mt-4">{book.description}</p>
            <div className="mt-6">
              <button
                onClick={() => onEdit(book)}
                className="px-6 py-3 mr-2 bg-white text-purple-500 rounded hover:bg-purple-600 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="px-6 py-3 bg-purple-700 text-white rounded hover:bg-purple-900"
              >
                Delete
              </button>
  
            </div>
            
            
          </li>
        ))}
      </ul>
     
    );
  };
  
  export default BookList;
  