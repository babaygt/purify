'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ReactMarkdown, { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeSection } from '@/components/suggestion/CodeSection'

interface CodeBlockProps {
	inline?: boolean
	className?: string
	children?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({
	inline,
	className,
	children,
	...props
}) => {
	const match = /language-(\w+)/.exec(className || '')

	return !inline && match ? (
		<SyntaxHighlighter
			style={tomorrow}
			language={match[1]}
			PreTag='div'
			{...props}
		>
			{String(children).replace(/\n$/, '')}
		</SyntaxHighlighter>
	) : (
		<code className={className} {...props}>
			{children}
		</code>
	)
}

interface Suggestion {
	file: string
	suggestions: string
	originalCode: string
}

export default function SuggestionDisplay() {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([])

	useEffect(() => {
		const storedSuggestions = localStorage.getItem('suggestions')
		if (storedSuggestions) {
			setSuggestions(JSON.parse(storedSuggestions))
		}
	}, [])

	if (suggestions.length === 0) {
		return <div>No suggestions available. Please upload files first.</div>
	}

	const customComponents: Components = {
		p: ({ children }) => <p className='mb-4'>{children}</p>,
		code: CodeBlock as Components['code'],
		ol: ({ children }) => (
			<ol className='list-decimal pl-6 mb-4'>{children}</ol>
		),
		ul: ({ children }) => <ul className='list-disc pl-6 mb-4'>{children}</ul>,
		li: ({ children }) => <li className='mb-2'>{children}</li>,
	}

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
							<div className='prose prose-sm max-w-none dark:prose-invert'>
								<ReactMarkdown components={customComponents}>
									{suggestion.suggestions}
								</ReactMarkdown>
							</div>
						</CodeSection>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
