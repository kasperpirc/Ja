import { OPENAI_API_KEY } from '$env/static/private';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({
	model: 'gpt-4.1-mini',
	temperature: 1,
	maxTokens: 100,
	apiKey: OPENAI_API_KEY
});
const parser = new StringOutputParser();

// -------------- Joke --------------

const joke_prompt = ChatPromptTemplate.fromTemplate(
	'tell me a joke about {topic}. Respond only with the joke.'
);
export const joke_message = joke_prompt.pipe(model).pipe(parser);

// -------------- Image --------------

const image_prompt = ChatPromptTemplate.fromMessages([
	new HumanMessage({
		content: [
			{
				type: 'text',
				text: 'what does this image contain?'
			},
			{
				type: 'image_url',
				// Use input variable "image_url"
				image_url: { url: '{image_url}' }
			}
		]
	})
]);

// Create the chain for image analysis
export const image_message = image_prompt.pipe(model).pipe(parser);

export async function get_chat_response(history: [string, string][]) {
	const prompt = ChatPromptTemplate.fromMessages(history);
	const chat = prompt.pipe(model).pipe(parser);

	return await chat.invoke({});
}
