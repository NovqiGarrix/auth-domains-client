import { FormEvent, useState } from "react";

import Head from "next/head";
import type { NextPage, GetServerSideProps } from "next";

import { Book } from "../types";
import booksApis from "../apis/books.api";
import LoadingIcon from "../components/LoadingIcon";

interface IHomeProps {
  books: Array<Book>;
}

const Home: NextPage<IHomeProps> = (props) => {
  const { books: _books } = props;

  // Without State
  // const { books } = props;

  // With State
  // We need to use state to store the new book data
  const [books, setBooks] = useState(_books);

  const [isDeletingBook, setIsDeletingBook] = useState(false);
  const [isAddingNewBook, setIsAddingNewBook] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAddingNewBook(true);

    const formData = new FormData(event.currentTarget);

    const input = {
      // Make sure to add `name` property to the input
      // in order to use this trick
      title: formData.get("book")! as string,
      author: formData.get("author")! as string,
    };

    try {
      const newBook = await booksApis.createBook(input);
      setBooks((prev) => [...prev, newBook]);
    } catch (error: any) {
      // You can use toast.error from react-toastify
      console.error("Error while creating new book", error.message);
    } finally {
      setIsAddingNewBook(false);

      const formEl = document.getElementById("newbook-form")!;
      // Remove the form input value
      // @ts-ignore
      formEl.reset();
    }
  }

  async function onDelete(bookId: string) {
    setIsDeletingBook(true);

    try {
      await booksApis.deleteBook(bookId);
      setBooks((prev) => prev.filter((book) => book.id !== bookId));
    } catch (error: any) {
      // You can use toast.error from react-toastify
      console.error("Error while creating new book", error.message);
    } finally {
      setIsDeletingBook(false);
    }
  }

  return (
    <div className="mx-auto my-auto flex w-full justify-center">
      <Head>
        <title>BookShelf - Next.js</title>
        <meta
          name="description"
          content="A BookShelf that contain a list of popular books"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl h-full py-10">
        <h1 className="text-xl text-orange-700 text-center">Books Table</h1>

        <div className="grid grid-cols-2 gap-20">
          <form id="newbook-form" className="mt-5" onSubmit={onSubmit}>
            <h3 className="text-base mt-3 text-black mb-2">Add a new book</h3>

            <div className="space-y-3">
              <input
                type="text"
                name="author"
                className="px-3 py-2 text-sm outline-none border border-gray-300 rounded-lg w-full"
                placeholder="Book's Author"
              />
              <input
                type="text"
                name="book"
                className="px-3 py-2 text-sm outline-none border border-gray-300 rounded-lg w-full"
                placeholder="Book's Title"
              />
            </div>

            <button
              type="submit"
              disabled={isAddingNewBook}
              className="px-7 mt-3 text-sm bg-indigo-500 rounded-lg py-2.5 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-600"
            >
              Submit
            </button>
          </form>

          <ul className="divide-y mt-10">
            {books.map((book) => (
              <li
                key={book.id}
                className="flex items-center justify-between py-2 first:pt-0"
              >
                <div>
                  <span className="block text-sm text-orange-700">
                    {book.author}
                  </span>
                  <h2>{book.title}</h2>
                </div>

                <button
                  type="button"
                  onClick={() => onDelete(book.id)}
                  disabled={isDeletingBook}
                  className="hover:text-red-500"
                >
                  {!isDeletingBook ? (
                    <span>Delete</span>
                  ) : (
                    <LoadingIcon fill="#000" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await booksApis.getBooks();

  return {
    props: {
      books,
    },
  };
};

export default Home;
