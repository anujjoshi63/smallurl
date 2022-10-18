import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import Footer from "../components/Footer";
export default function WhatsAppPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-gray-50 gap-10 px-4">
      <Head>
        <title>Contactless Whatsapp</title>
        <meta property="og:url" content={"https://smallify.live/wa"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WhatsApp without saving number!" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="No more saving unwanted contacts!"
        />
        <meta property="og:image" content={"https://smallify.tech/wa.png"} />
        <meta
          name="description"
          content="WhatsApp without saving their number!"
        />
      </Head>
      <h1 className="flex justify-center text-5xl mb-5 cursor-default">
        smallify
      </h1>
      <h1 className="text-2xl sm:text-xl">
        Want to WhatsApp someone without saving their number?
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let sanitizedPhoneNumber = phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", "")
            .replaceAll("+", "")
            .replace(/\D/g, "");
          console.log(sanitizedPhoneNumber);
          Router.push(`/wa/${sanitizedPhoneNumber}`);
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-1">
          <span className="font-medium mr-2 whitespace-nowrap">
            Enter their number here
          </span>
          <input
            required
            type="text"
            placeholder="e.g. +1 999 999 9999"
            className="text-black my-1 py-2 px-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 block w-full rounded-md sm:text-sm focus:ring-1"
            minLength={7}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Go ahead"
          className="rounded bg-cyan-500 py-2 px-3 cursor-pointer mt-1"
          disabled={phoneNumber.length < 8}
        />
      </form>
      <p>
        <span>you will be redirected to a page, click on</span>{" "}
        <code style={{ color: "#128c7e" }}>Continue to chat</code>
      </p>
      <Footer />
    </div>
  );
}
