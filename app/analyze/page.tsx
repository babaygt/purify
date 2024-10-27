import FileUpload from '@/components/FileUpload'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageContainer } from '@/components/layout/PageContainer'

export default function AnalyzePage() {
	return (
		<PageContainer title='Code Analysis'>
			<Tabs defaultValue='general' className='w-full'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='general'>General Analysis</TabsTrigger>
					<TabsTrigger value='refactoring'>Refactoring (M. Fowler)</TabsTrigger>
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
		</PageContainer>
	)
}
