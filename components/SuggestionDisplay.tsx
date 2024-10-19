'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

interface CodeBlockProps {
	inline?: boolean
	className?: string
	children: React.ReactNode
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

const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text)
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

	const customRenderers = {
		p: ({ children }: { children: React.ReactNode }) => (
			<p className='mb-4'>{children}</p>
		),
		code: CodeBlock,
		ol: ({ children }: { children: React.ReactNode }) => (
			<ol className='list-decimal pl-6 mb-4'>{children}</ol>
		),
		ul: ({ children }: { children: React.ReactNode }) => (
			<ul className='list-disc pl-6 mb-4'>{children}</ul>
		),
		li: ({ children }: { children: React.ReactNode }) => (
			<li className='mb-2'>{children}</li>
		),
	}

	return (
		<div className='space-y-8'>
			{suggestions.map((suggestion, index) => (
				<Card key={index} className='bg-card text-card-foreground'>
					<CardHeader>
						<CardTitle className='text-center'>{suggestion.file}</CardTitle>
					</CardHeader>
					<CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
						<div>
							<div className='flex justify-between items-center mb-2'>
								<h4 className='font-semibold'>Original Code</h4>
								<Button
									variant='outline'
									size='sm'
									onClick={() => copyToClipboard(suggestion.originalCode)}
								>
									<Copy className='mr-2 h-4 w-4' />
									Copy
								</Button>
							</div>
							<ScrollArea className='h-[600px] w-full rounded-md border p-4 bg-muted'>
								<SyntaxHighlighter
									language='javascript'
									style={tomorrow}
									wrapLines={true}
									showLineNumbers={true}
									className='text-sm'
								>
									{suggestion.originalCode}
								</SyntaxHighlighter>
							</ScrollArea>
						</div>
						<div>
							<div className='flex justify-between items-center mb-2'>
								<h4 className='font-semibold'>Suggestions</h4>
								<Button
									variant='outline'
									size='sm'
									onClick={() => copyToClipboard(suggestion.suggestions)}
								>
									<Copy className='mr-2 h-4 w-4' />
									Copy
								</Button>
							</div>
							<ScrollArea className='h-[600px] w-full rounded-md border p-4 bg-muted'>
								<div className='prose prose-sm max-w-none dark:prose-invert'>
									<ReactMarkdown components={customRenderers}>
										{suggestion.suggestions}
									</ReactMarkdown>
								</div>
							</ScrollArea>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
