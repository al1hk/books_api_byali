import { NextResponse } from 'next/server';

let books = [
  {
    id: 1,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description:
      "This book is about the importance of financial literacy and how anyone can achieve financial independence. It is a must-read for anyone who wants to improve their financial situation.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "This book is about how small changes can lead to big results. It provides a comprehensive guide on how to build good habits and break bad ones.",
  },
  {
    id: 3,
    title: "$100 Million Dollar Offer",
    author: "Alex Hormozi",
    description:
      "This book is a guide on how to create a successful business. It provides insights on how to identify opportunities, build a team, and create a successful marketing strategy.",
  },
  {
    id: 4,
    title: "$100 Million Dollar lead",
    author: "Alex Hormozi",
    description:
      "This book is a guide on how to create a successful lead generation strategy. It provides insights on how to identify opportunities, build a team, and create a successful marketing strategy.",
  },
  {
    id: 5,
    title: "Diary of a CEO",
    author: "Steven bartlett",
    description:
      "This book is about the experiences of a CEO and how he built his business. It provides insights on how to identify opportunities, build a team, and create a successful marketing strategy.",
  },
  {
    id: 6,
    title: "Feel Good Productivity",
    author: "Ali Abdaal",
    description:
      "This book is about how to be more productive and achieve your goals. It provides insights on how to prioritize tasks, manage time, and stay motivated.",
  },
  {
    id: 7,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    description:
      "This book is about how to be more successful and powerful. It provides insights on how to build a successful career, build a team, and create a successful marketing strategy.",
  },
  {
    id: 8,
    title:
      "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life",
    author: "Mark Manson",
    description:
      "This book is about how to be more successful and happy. It provides insights on how to build a successful career, build a team, and create a successful marketing strategy.",
  },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const { title, author, description } = await req.json(); 
  const newBook = { id: Date.now(), title, author, description }; 
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, title, author, description } = await req.json();
  books = books.map(book =>
    book.id === id ? { ...book, title, author, description } : book 
  );
  return NextResponse.json({ id, title, author, description }); 
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  books = books.filter(book => book.id !== id);
  return NextResponse.json({ message: 'Book deleted successfully' });
}
