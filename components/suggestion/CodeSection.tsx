import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeSectionProps {
	title: string
	content: string
	isMarkdown?: boolean
	children?: React.ReactNode
}

export function CodeSection({
	title,
	content,
	isMarkdown = false,
	children,
}: CodeSectionProps) {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-2'>
				<h4 className='font-semibold'>{title}</h4>
				<Button
					variant='outline'
					size='sm'
					onClick={() => copyToClipboard(content)}
				>
					<Copy className='mr-2 h-4 w-4' />
					Copy
				</Button>
			</div>
			<ScrollArea className='h-[600px] w-full rounded-md border p-4 bg-muted'>
				{isMarkdown ? (
					children
				) : (
					<SyntaxHighlighter
						language='javascript'
						style={tomorrow}
						wrapLines={true}
						showLineNumbers={true}
						className='text-sm'
					>
						{content}
					</SyntaxHighlighter>
				)}
			</ScrollArea>
		</div>
	)
}
