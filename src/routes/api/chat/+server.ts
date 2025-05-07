import { get_chat_response } from '$lib/ai';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { history } = await request.json();

	const response = await get_chat_response(history);
	return json({ message: response });
}
