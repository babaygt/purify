import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
	value: string
	onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className='relative flex-grow'>
			<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
			<Input
				placeholder='Search rules...'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='pl-10 w-full'
			/>
		</div>
	)
}
