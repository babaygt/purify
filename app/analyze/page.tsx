import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageContainer } from '@/components/layout/PageContainer'
import { AnalysisTab } from '@/components/analyze/AnalysisTab'

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
					<AnalysisTab analysisType='general' />
				</TabsContent>
				<TabsContent value='refactoring'>
					<AnalysisTab analysisType='refactoring' />
				</TabsContent>
				<TabsContent value='clean-code'>
					<AnalysisTab analysisType='clean-code' />
				</TabsContent>
			</Tabs>
		</PageContainer>
	)
}
