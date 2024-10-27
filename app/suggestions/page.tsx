'use client'

import SuggestionDisplay from '@/components/SuggestionDisplay'
import { PageContainer } from '@/components/layout/PageContainer'
import { LoadingState } from '@/components/state/loading-state'
import { ErrorState } from '@/components/state/error-state'
import { useSuggestions } from '@/hooks/useSuggestions'

export default function SuggestionsPage() {
	const { loading, error } = useSuggestions()

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
