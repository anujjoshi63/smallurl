import type { NextPage } from "next";
import { useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import debounce from "lodash/debounce"
import { trpc } from "../../utils/trpc";
import copy from "copy-to-clipboard"


type Form = {
    slug: string;
    url: string;
}

const CreateLink: NextPage = () => {
    const [form, setForm] = useState<Form>({ slug: "", url: "" });
    const url = window.location.origin;

    const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const createSlug = trpc.useMutation(['createSlug'])

    const input = "text-black my-1 py-2 px-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 block w-full rounded-md sm:text-sm focus:ring-1"

    const slugInput = classNames(input, {
        "border-red-500": slugCheck.isFetched && slugCheck.data!.used,
        "text-red-500": slugCheck.isFetched && slugCheck.data!.used,
    });

    if (createSlug.status === 'success') {
        return (
            <>
                <h1 className="flex justify-center text-5xl mb-5 cursor-default">small url</h1>
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
            </>
        )
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createSlug.mutate({ ...form })
                }}
                className="flex flex-col justify-center h-max sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 gap-1 "
            >

                <h1 className="flex justify-center text-5xl mb-5 cursor-default">small url</h1>
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
                <div className="flex items-center gap-1">
                    <span className="font-medium mr-2 whitespace-nowrap">{url}/</span>
                    <input
                        type="text"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                slug: e.target.value,
                            })
                            debounce(slugCheck.refetch, 1000)
                        }}
                        minLength={1}
                        placeholder="e.g. gh"
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
                        placeholder="e.g. https://github.com"
                        required
                        className={input}
                    />
                </div>
                <input
                    type="submit"
                    value="Create"
                    className="rounded bg-cyan-500 py-2 px-3 cursor-pointer mt-1"
                    disabled={slugCheck.isFetched && slugCheck.data!.used}
                />
            </form>
        </>
    );
};

export default CreateLink;