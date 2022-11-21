// /src/pages/api/register.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const method = req.method;
    if (method !== "POST") return res.status(405).send({ error: "Method Not Allowed!" });

    const API_URL = `${process.env.SERVER_URL}/api/v1/auth`;
    const defaultRequestHeader = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    try {

        // Fetch the server
        const resp = await fetch(`${API_URL}/register`, {
            headers: defaultRequestHeader,
            method: "POST",
            body: JSON.stringify(req.body)
        });

        // Getting the response JSON
        const { error } = await resp.json();
        if (error) throw new Error(error);

        // Return a response
        return res.send({
            data: "OK",
            error: null
        })

    } catch (error: any) {
        console.info(error.message);
        return res.status(500).send({ error: error.message });
    }

}