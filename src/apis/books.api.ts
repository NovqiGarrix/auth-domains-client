// src/apis/books.api.ts
import { Book } from "../types";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

async function getBooks(): Promise<Array<Book>> {

    const resp = await fetch(`${SERVER_URL}/api/v1/books`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const { error, data } = await resp.json();
    if (error) throw new Error(error);

    return data.map((book: any) => ({ id: book._id, title: book.title, author: book.author }));

}

// Omit means we don't need to pass in the id
async function createBook(input: Omit<Book, "id">): Promise<Book> {

    // Send the request to Nextjs API route
    const resp = await fetch(`/api/books`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input),
        credentials: "include"
    });

    const { error, data } = await resp.json();
    if (error) throw new Error(error);

    return data;

}

async function deleteBook(bookId: string): Promise<void> {

    // Send the request to Nextjs API route
    const resp = await fetch(`/api/books?bookId=${bookId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const { error, data } = await resp.json();
    if (error) throw new Error(error);

    return data;

}

const booksApis = {
    getBooks, createBook, deleteBook
}

export default booksApis;