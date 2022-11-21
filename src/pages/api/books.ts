import { NextApiRequest, NextApiResponse } from 'next';

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const method = req.method;

    // Create a new book
    if (method === "POST") {
        const { qid: access_token } = req.cookies;
        if (!access_token) return res.status(401).json({ error: "Please Login to Continue!" });

        try {
            const resp = await fetch(`${SERVER_URL}/api/v1/books`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(req.body),
            });

            const { error, data } = await resp.json();
            if (error) return res.status(resp.status).send({ error });

            return res.status(201).send({ data, error });
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send({ error: "Internal Server Error" });
        }

    } else if (method === "DELETE") {
        const { qid: access_token } = req.cookies;
        if (!access_token) return res.status(401).json({ error: "Please Login to Continue!" });

        const { bookId } = req.query;
        if (!bookId) return res.status(400).json({ error: "Book ID is required!" });

        try {
            const resp = await fetch(`${SERVER_URL}/api/v1/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(req.body),
            });

            const { error, data } = await resp.json();
            if (error) return res.status(resp.status).send({ error });

            return res.status(201).send({ data, error });
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send({ error: "Internal Server Error" });
        }
    }

}