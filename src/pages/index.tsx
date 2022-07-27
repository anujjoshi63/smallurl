import type { NextPage } from "next";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import debounce from "lodash/debounce"
import { trpc } from "../../utils/trpc";
import copy from "copy-to-clipboard"
import Footer from "../components/Footer/Footer"
type Form = {
  slug: string;
  url: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const [url, setUrl] = useState<string>("");

  useEffect(() => setUrl(window.location.origin), [])

  const slugCheck = trpc.useQuery(['slugCheck', { slug: form.slug }], { enabled: false })
  const createSlug = trpc.useMutation(['createSlug'])

  const main = "flex flex-col justify-center items-center h-screen bg-gray-800 text-gray-50"

  const input = "text-black my-1 py-2 px-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 block w-full rounded-md sm:text-sm focus:ring-1"

  const slugInput = classNames(input, {
    "border-red-500": slugCheck.isFetched && slugCheck.data!.count > 0,
    "text-red-500": slugCheck.isFetched && slugCheck.data!.count > 0,
  });

  if (createSlug.status === 'success') {
    return (
      <div className={main}>
        <h1 className="flex justify-center text-5xl mb-20 cursor-default">small url</h1>
        <div className="flex justify-center items-center">
          <a href={`${url}/${form.slug}`}>
            <h1>{`${url}/${form.slug}`}</h1>
          </a>

        </div>
        <div className="">

          <input
            type="button"
            value="Copy Link"
            className="rounded bg-cyan-500 py-2 px-3  cursor-pointer m-5"
            onClick={() => {
              copy(`${url}/${form.slug}`)
            }}
          />
          <input
            type="button"
            value="Another one"
            className="rounded bg-cyan-500 py-2 px-3  cursor-pointer m-5"
            onClick={() => {
              createSlug.reset()
              setForm({ slug: "", url: "" })
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={main}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createSlug.mutate({ ...form })
        }}
        className="flex flex-col justify-center h-max sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 gap-1 "
      >
        <h1 className="flex justify-center text-5xl mb-20 cursor-default">small url</h1>
        <div className="flex items-center gap-1">
          <span className="font-medium mr-2">{url}/</span>
          <input
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                slug: e.target.value,
              })
              debounce(slugCheck.refetch, 100)
            }}
            minLength={1}
            placeholder="gh"
            className={slugInput}
            value={form.slug}
            pattern={"^[-a-zA-Z0-9]+$"}
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            required
          />
        </div>
        <input
          type="button"
          value="Random"
          className="rounded border-cyan-600 border-2 py-2 px-3 cursor-pointer ml-2"
          onClick={() => {
            const slug = nanoid()
            setForm({
              ...form,
              slug
            })
            slugCheck.refetch()
          }}
        />
        <div className="flex items-center mt-5">
          <span className="font-medium mr-2">Link</span>
          <input
            type="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://github.com"
            required
            className={input}
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="rounded bg-cyan-500 py-2 px-3 cursor-pointer mt-1"
          disabled={slugCheck.isFetched && slugCheck.data!.count > 0}
        />
      </form>
      <Footer />
    </div>
  );
};

export default Home;