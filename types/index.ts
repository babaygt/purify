export interface CustomRule {
	id: string
	name: string
	description: string
	pattern: string
	suggestion: string
}

export interface Suggestion {
	file: string
	suggestions: string
	originalCode: string
}
