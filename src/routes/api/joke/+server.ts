import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const message = await request.text();

	return json({ message: message });
}
