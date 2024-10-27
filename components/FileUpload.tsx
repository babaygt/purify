'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Upload, FileText } from 'lucide-react'
import { LoadingState } from '@/components/state/loading-state'
import { ErrorState } from '@/components/state/error-state'
import {
	filterUploadedFiles,
	processStreamResponse,
	uploadFiles,
} from '@/utils/fileHandlers'

interface FileUploadProps {
	analysisType: 'general' | 'refactoring' | 'clean-code'
}

export default function FileUpload({ analysisType }: FileUploadProps) {
	const [files, setFiles] = useState<File[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files)
			const filteredFiles = filterUploadedFiles(selectedFiles)
			setFiles(filteredFiles)
		}
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const reader = await uploadFiles(files, analysisType)
			if (reader) {
				const suggestions = await processStreamResponse(reader)
				localStorage.setItem('suggestions', JSON.stringify(suggestions))
				router.push('/suggestions')
			}
		} catch (error) {
			setError('Error uploading files. Please try again.')
			console.error('Error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	if (isLoading) {
		return <LoadingState size={8} className='h-32' />
	}

	if (error) {
		return (
			<ErrorState
				message={error}
				actionText='Try Again'
				actionHref='#'
				onClick={() => setError(null)}
			/>
		)
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='flex items-center justify-center w-full'>
				<label
					htmlFor='dropzone-file'
					className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition duration-300 ease-in-out'
				>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<Upload className='w-10 h-10 mb-3 text-muted-foreground' />
						<p className='mb-2 text-sm text-muted-foreground'>
							<span className='font-semibold'>Click to upload</span> or drag and
							drop
						</p>
						<p className='text-xs text-muted-foreground'>
							Supported file types: .js, .ts, .py, etc.
						</p>
					</div>
					<Input
						id='dropzone-file'
						type='file'
						onChange={handleFileChange}
						multiple
						className='hidden'
					/>
				</label>
			</div>
			{files.length > 0 && (
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
			)}
			<Button
				type='submit'
				disabled={isLoading || files.length === 0}
				className='w-full'
			>
				{isLoading ? 'Processing...' : 'Upload and Analyze'}
			</Button>
		</form>
	)
}
