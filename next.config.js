// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  // These variables won't populate in the browser
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};
