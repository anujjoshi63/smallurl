import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const nextPath = req.nextUrl.pathname;
	if (!nextPath.startsWith('/api/') && nextPath !== '/') {
		const slug = nextPath.split('/').pop();
		const slugFetch = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);
		if (slugFetch.status === 404) {
			return NextResponse.redirect(req.nextUrl.origin);
		}
		const data = await slugFetch.json();
		if (data?.url) {
			return NextResponse.redirect(data.url);
		}
		console.log('in middleware');
	}
}
