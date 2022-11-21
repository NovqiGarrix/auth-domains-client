// /src/pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const method = req.method;
    if (method !== "POST") return res.status(405).send({ error: "Method Not Allowed!" });

    const API_URL = `${process.env.SERVER_URL}/api/v1/auth`;
    const defaultRequestHeader = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    try {

        // Do some request body validation here before sending the request to the server
        // const { email, password } = req.body;

        // Fetch the server
        const resp = await fetch(`${API_URL}/login`, {
            headers: defaultRequestHeader,
            method: "POST",
            body: JSON.stringify(req.body)
        });

        // Getting the response JSON
        const { error, data: respData } = await resp.json();
        if (error) throw new Error(error);

        const { accessToken, expiresIn } = respData;

        // Set the cookie with the access token
        setCookie("qid", accessToken, {
            httpOnly: true,
            req, res, maxAge: expiresIn,
            sameSite: "strict"
        });

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