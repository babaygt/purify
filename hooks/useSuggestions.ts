import { useState, useEffect } from 'react'

export interface Suggestion {
	file: string
	suggestions: string
	originalCode: string
}

export function useSuggestions() {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const storedSuggestions = localStorage.getItem('suggestions')
		if (storedSuggestions) {
			try {
				setSuggestions(JSON.parse(storedSuggestions))
				setLoading(false)
			} catch (e) {
				setError(
					`Invalid suggestions data: ${
						e instanceof Error ? e.message : 'Unknown error'
					}`
				)
				setLoading(false)
			}
		} else {
			setLoading(false)
			setError('No suggestions available. Please upload files first.')
		}
	}, [])

	return { suggestions, loading, error }
}
