import CustomRuleEditor from '@/components/CustomRuleEditor'

export default function CustomRulesPage() {
	return (
		<div className='bg-background text-foreground min-h-screen'>
			<div className='container mx-auto p-4 sm:p-6 lg:p-8'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Custom Rules</h1>
				<CustomRuleEditor />
			</div>
		</div>
	)
}
