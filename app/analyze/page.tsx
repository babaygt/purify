import FileUpload from '@/components/FileUpload'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AnalyzePage() {
	return (
		<div className='bg-background text-foreground min-h-screen'>
			<div className='container mx-auto p-4 sm:p-6 lg:p-8'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Code Analysis</h1>
				<Tabs defaultValue='general' className='w-full'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='general'>General Analysis</TabsTrigger>
						<TabsTrigger value='refactoring'>
							Refactoring (M. Fowler)
						</TabsTrigger>
						<TabsTrigger value='clean-code'>Clean Code (R. Martin)</TabsTrigger>
					</TabsList>
					<TabsContent value='general'>
						<div className='bg-card text-card-foreground rounded-lg shadow-md p-6'>
							<FileUpload analysisType='general' />
						</div>
					</TabsContent>
					<TabsContent value='refactoring'>
						<div className='bg-card text-card-foreground rounded-lg shadow-md p-6'>
							<FileUpload analysisType='refactoring' />
						</div>
					</TabsContent>
					<TabsContent value='clean-code'>
						<div className='bg-card text-card-foreground rounded-lg shadow-md p-6'>
							<FileUpload analysisType='clean-code' />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
