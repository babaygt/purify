import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

type CustomRule = {
	name: string
	pattern: string
	suggestion: string
}

export async function analyzeCodeWithOpenAI(
	codeSnippet: string,
	filePath: string,
	analysisType: string,
	customRules: CustomRule[]
): Promise<string> {
	try {
		const limitedCodeSnippet = codeSnippet.slice(0, 1000)
		let systemMessage = 'You are a code review assistant.'
		let userMessage = `Here is a code snippet (limited to 1000 characters) from file ${filePath}:\n${limitedCodeSnippet}\n\n`
		switch (analysisType) {
			case 'refactoring':
				systemMessage +=
					' You specialize in refactoring techniques as described in "Refactoring" by Martin Fowler.'
				userMessage +=
					'Identify code smells and suggest refactorings based on Martin Fowler\'s "Refactoring" book.'
				break
			case 'clean-code':
				systemMessage +=
					' You specialize in clean code principles as described in "Clean Code" by Robert Martin.'
				userMessage +=
					'Analyze the code and suggest improvements based on Robert Martin\'s "Clean Code" principles.'
				break
			default:
				userMessage +=
					'Identify code smells and suggest refactorings with explanations.'
		}
		// Add custom rules to the user message
		if (customRules.length > 0) {
			userMessage += '\nAdditionally, apply the following custom rules:\n'
			customRules.forEach((rule: CustomRule) => {
				userMessage += `- Rule: ${rule.name}\n Pattern: ${rule.pattern}\n Suggestion: ${rule.suggestion}\n`
			})
		}
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: systemMessage },
				{ role: 'user', content: userMessage },
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
