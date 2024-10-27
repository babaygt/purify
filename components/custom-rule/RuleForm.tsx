import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CustomRule } from '@/types'

interface RuleFormProps {
	newRule: Omit<CustomRule, 'id'>
	onSubmit: (e: React.FormEvent) => void
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
}

export function RuleForm({ newRule, onSubmit, onChange }: RuleFormProps) {
	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<Label htmlFor='name'>Rule Name</Label>
				<Input
					id='name'
					name='name'
					placeholder='Enter rule name'
					value={newRule.name}
					onChange={onChange}
				/>
			</div>
			<div>
				<Label htmlFor='description'>Rule Description</Label>
				<Textarea
					id='description'
					name='description'
					placeholder='Describe the rule'
					value={newRule.description}
					onChange={onChange}
				/>
			</div>
			<div>
				<Label htmlFor='pattern'>Pattern (regex)</Label>
				<Input
					id='pattern'
					name='pattern'
					placeholder='Enter regex pattern'
					value={newRule.pattern}
					onChange={onChange}
				/>
			</div>
			<div>
				<Label htmlFor='suggestion'>Suggestion</Label>
				<Textarea
					id='suggestion'
					name='suggestion'
					placeholder='Provide a suggestion for improvement'
					value={newRule.suggestion}
					onChange={onChange}
				/>
			</div>
			<Button type='submit' className='w-full bg-green-500 hover:bg-green-600'>
				Add Rule
			</Button>
		</form>
	)
}
