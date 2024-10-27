import FileUpload from '@/components/FileUpload'

interface AnalysisTabProps {
	analysisType: 'general' | 'refactoring' | 'clean-code'
}

export function AnalysisTab({ analysisType }: AnalysisTabProps) {
	return (
		<div className='bg-card text-card-foreground rounded-lg shadow-md p-6'>
			<FileUpload analysisType={analysisType} />
		</div>
	)
}
