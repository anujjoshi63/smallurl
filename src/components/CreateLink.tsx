import type { NextPage } from "next";
import { useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import debounce from "lodash/debounce";
import { trpc } from "../../utils/trpc";
import copy from "copy-to-clipboard";

type Form = {
  slug: string;
  url: string;
};

const CreateLink: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const url = window.location.origin;

  const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createSlug = trpc.useMutation(["createSlug"]);

  const input =
    "text-black my-1 py-2 px-3 sm:px-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 block w-full rounded-md sm:text-sm focus:ring-1";

  const slugInput = classNames(input, {
    "border-red-500": slugCheck.isFetched && slugCheck.data!.used,
    "text-red-500": slugCheck.isFetched && slugCheck.data!.used,
  });

  if (createSlug.status === "success") {
    return (
      <>
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
              copy(`${url}/${form.slug}`);
            }}
          />
          <input
            type="button"
            value="Another one"
            className="rounded bg-cyan-500 py-2 px-3  cursor-pointer m-5"
            onClick={() => {
              createSlug.reset();
              setForm({ slug: "", url: "" });
            }}
          />
        </div>
      </>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ ...form });
      }}
      className="flex flex-col justify-center h-screen sm:w-1/2 md:w-1/2 lg:w-1/3 p-6 gap-1 basis-10/12"
    >
      <div>
        <span className="font-medium mr-2 whitespace-nowrap text-sm">
          🤏 Link to smallify
        </span>
        <div className="flex items-center">
          <input
            type="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="e.g. https://github.com"
            required
            className={input}
          />
        </div>
      </div>

      <div className="flex flex-col ">
        <span className="font-medium mr-2 whitespace-nowrap text-sm mt-4 flex gap-2 items-center">
          ✍️ Customize
          {slugCheck.data?.used && (
            <span className="font-medium text-center text-red-500">
              Already in use.
            </span>
          )}
          {!slugCheck.data?.used && (
            <span className="font-medium text-center text-red-500 text-transparent select-none">
              dummy
            </span>
          )}
        </span>
        <div className="flex items-center -mt-2">
          <span className="font-medium whitespace-nowrap mr-1">
            {url.replaceAll(/https?:\/\//gi, "")}/
          </span>
          <input
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                slug: e.target.value,
              });
              debounce(slugCheck.refetch, 300);
            }}
            minLength={1}
            placeholder="alias e.g. ig for instagram"
            className={slugInput}
            value={form.slug}
            pattern={"^[-a-zA-Z0-9]+$"}
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            required
          />
        </div>
        <div>
          <input
            type="button"
            value="Generate Random"
            className="rounded border-cyan-600 border-2 py-2 px-3 cursor-pointer w-50 mt-1 w-full"
            onClick={() => {
              const slug = nanoid();
              setForm({
                ...form,
                slug,
              });
              slugCheck.refetch();
            }}
          />
        </div>
      </div>

      <input
        type="submit"
        value="Smallify"
        className="rounded bg-cyan-500 py-2 px-3 cursor-pointer mt-4 text-lg"
        disabled={slugCheck.isFetched && slugCheck.data!.used}
      />
    </form>
  );
};

export default CreateLink;
