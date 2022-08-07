import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";
const CreateLinkForm = dynamic(() => import("../components/CreateLink"), {
  ssr: false,
});
import Footer from "../components/Footer";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-gray-50">
      <Head>
        <title>Smallify your URLs</title>
        <meta property="og:url" content={"https://smallify.vercel.app"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Smallify your long boring URLs" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="A Customizable URL shortener. Paste URL, give it a name, done!"
        />
        <meta
          property="og:image"
          content={
            "https://via.placeholder.com/1600x900/1f2937/f9fafb?text=smallify"
          }
        />
      </Head>
      <Suspense fallback="Loading...">
        <h1 className="flex justify-center text-5xl mb-5 cursor-default">
          small url
        </h1>
        <CreateLinkForm />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
