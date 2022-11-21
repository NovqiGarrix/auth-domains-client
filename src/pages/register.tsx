import { FormEvent, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email")! as string,
      password: formData.get("password")! as string,
    };

    // Async Fetch
    try {
      setIsLoading(true);

      const resp = await fetch("/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const { error } = await resp.json();
      if (error) throw new Error(error);

      // If everything is good, push user to the login page
      await router.replace("/login");
    } catch (error: any) {
      setError(error.message);
      // or you can use toast (react-toastify)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen my-auto flex w-full justify-center items-center flex-col">
      <Head>
        <title>Register Page - Bookshelf</title>
        <meta name="description" content="Join us to add some books!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-indigo-500 text-center">
          Sign Up
        </h1>

        <form className="flex flex-col space-y-3 mt-10" onSubmit={onSubmit}>
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}

          <input
            type="text"
            name="email"
            className="px-3 py-2 outline-none border border-gray-300 rounded-lg"
            placeholder="Email Address..."
          />
          <input
            type="password"
            name="password"
            className="px-3 py-2 outline-none border border-gray-300 rounded-lg"
            placeholder="Password..."
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 rounded-lg py-3 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
