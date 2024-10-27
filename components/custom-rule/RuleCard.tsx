import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FileCode, Trash2 } from 'lucide-react'
import { CustomRule } from '@/types'

interface RuleCardProps {
	rule: CustomRule
	onDelete: (id: string) => void
}

export function RuleCard({ rule, onDelete }: RuleCardProps) {
	return (
		<Card className='flex flex-col'>
			<CardHeader>
				<CardTitle className='flex items-center text-lg'>
					<FileCode className='mr-2 h-5 w-5 text-primary' />
					{rule.name}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex-grow'>
				<p className='text-sm text-muted-foreground mb-2'>{rule.description}</p>
				<div className='space-y-2'>
					<p className='text-sm'>
						<strong>Pattern:</strong>{' '}
						<code className='bg-muted p-1 rounded'>{rule.pattern}</code>
					</p>
					<p className='text-sm'>
						<strong>Suggestion:</strong> {rule.suggestion}
					</p>
				</div>
			</CardContent>
			<CardFooter>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant='destructive' className='w-full'>
							<Trash2 className='mr-2 h-4 w-4' /> Delete
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								custom rule.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={() => onDelete(rule.id)}>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	)
}
