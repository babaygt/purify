'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CodeSection } from '@/components/suggestion/CodeSection'
import { MarkdownRenderer } from '@/components/suggestion/MarkdownRenderer'
import { useSuggestions } from '@/hooks/useSuggestions'

export default function SuggestionDisplay() {
	const { suggestions } = useSuggestions()

	return (
		<div className='space-y-8'>
			{suggestions.map((suggestion, index) => (
				<Card key={index} className='bg-card text-card-foreground'>
					<CardHeader>
						<CardTitle className='text-center'>{suggestion.file}</CardTitle>
					</CardHeader>
					<CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
						<CodeSection
							title='Original Code'
							content={suggestion.originalCode}
						/>
						<CodeSection
							title='Suggestions'
							content={suggestion.suggestions}
							isMarkdown={true}
						>
							<MarkdownRenderer content={suggestion.suggestions} />
						</CodeSection>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
