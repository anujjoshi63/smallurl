import Link from "next/link";
let origin = "";
if (typeof window !== "undefined") origin = window.location.origin;

export default function show404() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-800 text-gray-50">
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        404 | Invalid alias, check for typos, or
        <Link href={origin}>
          <button className="m-1 cursor-pointer rounded bg-gray-700 px-1">
            Go back to home page
          </button>
        </Link>
      </h1>
    </div>
  );
}
