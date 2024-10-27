'use client'

import { useState, useEffect } from 'react'
import SuggestionDisplay from '@/components/SuggestionDisplay'
import { PageContainer } from '@/components/layout/PageContainer'
import { LoadingState } from '@/components/state/loading-state'
import { ErrorState } from '@/components/state/error-state'

export default function SuggestionsPage() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const storedSuggestions = localStorage.getItem('suggestions')
		if (storedSuggestions) {
			setLoading(false)
		} else {
			setLoading(false)
			setError('No suggestions available. Please upload files first.')
		}
	}, [])

	return (
		<PageContainer title='Refactoring Suggestions'>
			{loading ? (
				<LoadingState />
			) : error ? (
				<ErrorState message={error} />
			) : (
				<SuggestionDisplay />
			)}
		</PageContainer>
	)
}
