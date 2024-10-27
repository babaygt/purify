import { useState, useEffect } from 'react'

export interface CustomRule {
	id: string
	name: string
	description: string
	pattern: string
	suggestion: string
}

export function useCustomRules() {
	const [rules, setRules] = useState<CustomRule[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const storedRules = localStorage.getItem('customRules')
		if (storedRules) {
			setRules(JSON.parse(storedRules))
		}
		setIsLoading(false)
	}, [])

	const addRule = (newRule: Omit<CustomRule, 'id'>) => {
		const ruleWithId = { ...newRule, id: Date.now().toString() }
		const updatedRules = [...rules, ruleWithId]
		setRules(updatedRules)
		localStorage.setItem('customRules', JSON.stringify(updatedRules))
		return ruleWithId
	}

	const deleteRule = (id: string) => {
		const updatedRules = rules.filter((rule) => rule.id !== id)
		setRules(updatedRules)
		localStorage.setItem('customRules', JSON.stringify(updatedRules))
	}

	return { rules, isLoading, addRule, deleteRule }
}
