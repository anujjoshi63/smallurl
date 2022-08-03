import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreateLinkForm = dynamic(() => import("../components/CreateLink"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), {
  ssr: false,
});
const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-gray-50">
      <Suspense>
        <CreateLinkForm />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
