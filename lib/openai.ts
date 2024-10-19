import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeCodeWithOpenAI(
	codeSnippet: string,
	filePath: string
): Promise<string> {
	try {
		const limitedCodeSnippet = codeSnippet.slice(0, 1000)

		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: 'You are a code review assistant.' },
				{
					role: 'user',
					content: `Here is a code snippet (limited to 1000 characters) from file ${filePath}:\n${limitedCodeSnippet}\n\nIdentify code smells and suggest refactorings with explanations.`,
				},
			],
			temperature: 0.7,
			max_tokens: 1200,
		})
		return response.choices[0].message.content || 'No suggestions available.'
	} catch (error) {
		console.error('Error with OpenAI API:', error)
		return 'Unable to process code at this time.'
	}
}
