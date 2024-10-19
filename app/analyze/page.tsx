import FileUpload from '@/components/FileUpload'

export default function AnalyzePage() {
	return (
		<div className='bg-background text-foreground min-h-screen'>
			<div className='container mx-auto p-4 sm:p-6 lg:p-8'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Code Analysis</h1>
				<div className='bg-card text-card-foreground rounded-lg shadow-md p-6'>
					<FileUpload />
				</div>
			</div>
		</div>
	)
}
