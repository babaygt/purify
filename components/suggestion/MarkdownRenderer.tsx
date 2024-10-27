import ReactMarkdown, { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

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

const customComponents: Components = {
	p: ({ children }) => <p className='mb-4'>{children}</p>,
	code: CodeBlock as Components['code'],
	ol: ({ children }) => <ol className='list-decimal pl-6 mb-4'>{children}</ol>,
	ul: ({ children }) => <ul className='list-disc pl-6 mb-4'>{children}</ul>,
	li: ({ children }) => <li className='mb-2'>{children}</li>,
}

interface MarkdownRendererProps {
	content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<div className='prose prose-sm max-w-none dark:prose-invert'>
			<ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
		</div>
	)
}
