import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
	message: string
	actionHref?: string
	actionText?: string
	onClick?: () => void
}

export function ErrorState({
	message,
	actionHref = '/analyze',
	actionText = 'Start New Analysis',
	onClick,
}: ErrorStateProps) {
	if (onClick) {
		return (
			<div className='text-center'>
				<p className='text-destructive mb-4'>{message}</p>
				<Button onClick={onClick}>{actionText}</Button>
			</div>
		)
	}

	return (
		<div className='text-center'>
			<p className='text-destructive mb-4'>{message}</p>
			<Link href={actionHref}>
				<Button>{actionText}</Button>
			</Link>
		</div>
	)
}
