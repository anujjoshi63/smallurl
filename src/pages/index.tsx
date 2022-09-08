import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Head from 'next/head';
const CreateLinkForm = dynamic(() => import('../components/CreateLink'), {
	ssr: true
});
const Footer = dynamic(() => import('../components/Footer'), {
	ssr: true
});
const Home: NextPage = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-gray-50">
			<Head>
				<title>Smallify your URLs</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta
					property="og:url"
					content={'https://smallify.vercel.app'}
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Smallify your long boring URLs"
				/>
				<meta name="twitter:card" content="summary" />
				<meta
					property="og:description"
					content="A Customizable URL shortener. Paste URL, give it a name, done!"
				/>
				<meta
					property="og:image"
					content={'https://smallify.tech/smallify.png'}
				/>
			</Head>
			<Suspense>
				<CreateLinkForm />
			</Suspense>
			<Footer />
		</div>
	);
};

export default Home;
