import { image_message } from '$lib/ai';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const message = await request.text();

	const joke = await image_message.invoke({ image_url: message });

	return json({ message: message });
}
