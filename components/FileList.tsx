import { FileText } from 'lucide-react'

interface FileListProps {
	files: File[]
}

export function FileList({ files }: FileListProps) {
	if (files.length === 0) return null

	return (
		<div className='bg-muted rounded-lg p-4'>
			<h3 className='text-lg font-semibold mb-2 flex items-center text-foreground'>
				<FileText className='mr-2' /> Selected Files
			</h3>
			<ul className='list-disc list-inside'>
				{files.map((file, index) => (
					<li key={index} className='text-sm text-muted-foreground'>
						{file.name}
					</li>
				))}
			</ul>
		</div>
	)
}
