'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SuggestionDisplay from '@/components/SuggestionDisplay'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

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
		<div className='bg-background text-foreground'>
			<div className='container mx-auto p-4 sm:p-6 lg:p-8'>
				<h1 className='text-3xl font-bold mb-6'>Refactoring Suggestions</h1>
				{loading ? (
					<div className='flex justify-center items-center h-64'>
						<Loader2 className='mr-2 h-16 w-16 animate-spin' />
					</div>
				) : error ? (
					<div className='text-center'>
						<p className='text-destructive mb-4'>{error}</p>
						<Link href='/analyze'>
							<Button>Start New Analysis</Button>
						</Link>
					</div>
				) : (
					<SuggestionDisplay />
				)}
			</div>
		</div>
	)
}
