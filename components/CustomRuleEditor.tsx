'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Search, Plus, Trash2, FileCode } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface CustomRule {
	id: string
	name: string
	description: string
	pattern: string
	suggestion: string
}

export default function CustomRuleEditor() {
	const [rules, setRules] = useState<CustomRule[]>([])
	const [newRule, setNewRule] = useState<CustomRule>({
		id: '',
		name: '',
		description: '',
		pattern: '',
		suggestion: '',
	})
	const [searchTerm, setSearchTerm] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		const storedRules = localStorage.getItem('customRules')
		if (storedRules) {
			setRules(JSON.parse(storedRules))
		}
	}, [])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNewRule({ ...newRule, [e.target.name]: e.target.value })
	}

	const handleAddRule = (e: React.FormEvent) => {
		e.preventDefault()
		const updatedRules = [...rules, { ...newRule, id: Date.now().toString() }]
		setRules(updatedRules)
		localStorage.setItem('customRules', JSON.stringify(updatedRules))
		setNewRule({
			id: '',
			name: '',
			description: '',
			pattern: '',
			suggestion: '',
		})
		setIsModalOpen(false)
	}

	const handleDeleteRule = (id: string) => {
		const updatedRules = rules.filter((rule) => rule.id !== id)
		setRules(updatedRules)
		localStorage.setItem('customRules', JSON.stringify(updatedRules))
	}

	const filteredRules = rules.filter((rule) =>
		rule.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='space-y-8 max-w-6xl mx-auto'>
			<div className='flex items-center justify-between space-x-4'>
				<div className='relative flex-grow'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
					<Input
						placeholder='Search rules...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-10 w-full'
					/>
				</div>
				<Button
					onClick={() => setIsModalOpen(true)}
					className='bg-green-500 hover:bg-green-600'
				>
					<Plus className='mr-2 h-4 w-4' /> Add New Rule
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{filteredRules.map((rule) => (
					<Card key={rule.id} className='flex flex-col'>
						<CardHeader>
							<CardTitle className='flex items-center text-lg'>
								<FileCode className='mr-2 h-5 w-5 text-primary' />
								{rule.name}
							</CardTitle>
						</CardHeader>
						<CardContent className='flex-grow'>
							<p className='text-sm text-muted-foreground mb-2'>
								{rule.description}
							</p>
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
											This action cannot be undone. This will permanently delete
											the custom rule.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => handleDeleteRule(rule.id)}
										>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</CardFooter>
					</Card>
				))}
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Rule</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleAddRule} className='space-y-4'>
						<div>
							<Label htmlFor='name'>Rule Name</Label>
							<Input
								id='name'
								name='name'
								placeholder='Enter rule name'
								value={newRule.name}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label htmlFor='description'>Rule Description</Label>
							<Textarea
								id='description'
								name='description'
								placeholder='Describe the rule'
								value={newRule.description}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label htmlFor='pattern'>Pattern (regex)</Label>
							<Input
								id='pattern'
								name='pattern'
								placeholder='Enter regex pattern'
								value={newRule.pattern}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label htmlFor='suggestion'>Suggestion</Label>
							<Textarea
								id='suggestion'
								name='suggestion'
								placeholder='Provide a suggestion for improvement'
								value={newRule.suggestion}
								onChange={handleInputChange}
							/>
						</div>
						<Button
							type='submit'
							className='w-full bg-green-500 hover:bg-green-600'
						>
							Add Rule
						</Button>
					</form>
				</DialogContent>
			</Dialog>

			{filteredRules.length === 0 && (
				<p className='text-center text-muted-foreground'>No rules found.</p>
			)}
		</div>
	)
}
