'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RuleForm } from '@/components/custom-rule/RuleForm'
import { Plus } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { RuleCard } from '@/components/custom-rule/RuleCard'
import { SearchBar } from '@/components/custom-rule/SearchBar'
import { useCustomRules } from '@/hooks/useCustomRules'
import { LoadingState } from '@/components/state/loading-state'
import { CustomRule } from '@/types'

export default function CustomRuleEditor() {
	const { rules, isLoading, addRule, deleteRule } = useCustomRules()
	const [newRule, setNewRule] = useState<Omit<CustomRule, 'id'>>({
		name: '',
		description: '',
		pattern: '',
		suggestion: '',
	})
	const [searchTerm, setSearchTerm] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNewRule({ ...newRule, [e.target.name]: e.target.value })
	}

	const handleAddRule = (e: React.FormEvent) => {
		e.preventDefault()
		addRule(newRule)
		setNewRule({
			name: '',
			description: '',
			pattern: '',
			suggestion: '',
		})
		setIsModalOpen(false)
	}

	const filteredRules = rules.filter((rule) =>
		rule.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	if (isLoading) {
		return <LoadingState />
	}

	return (
		<div className='space-y-8 max-w-6xl mx-auto'>
			<div className='flex items-center justify-between space-x-4'>
				<SearchBar value={searchTerm} onChange={setSearchTerm} />
				<Button
					onClick={() => setIsModalOpen(true)}
					className='bg-green-500 hover:bg-green-600'
				>
					<Plus className='mr-2 h-4 w-4' /> Add New Rule
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{filteredRules.map((rule) => (
					<RuleCard key={rule.id} rule={rule} onDelete={deleteRule} />
				))}
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Rule</DialogTitle>
					</DialogHeader>
					<RuleForm
						newRule={newRule}
						onSubmit={handleAddRule}
						onChange={handleInputChange}
					/>
				</DialogContent>
			</Dialog>

			{filteredRules.length === 0 && (
				<p className='text-center text-muted-foreground'>No rules found.</p>
			)}
		</div>
	)
}
