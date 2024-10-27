import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
	className?: string
	size?: number
}

export function LoadingState({
	className = 'h-64',
	size = 16,
}: LoadingStateProps) {
	return (
		<div className={`flex justify-center items-center ${className}`}>
			<Loader2 className={`mr-2 h-${size} w-${size} animate-spin`} />
		</div>
	)
}
