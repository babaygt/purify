import { Suggestion } from '@/types'

export function filterUploadedFiles(files: File[]): File[] {
	return files.filter((file) => {
		const relativePath = file.webkitRelativePath || file.name
		return (
			!relativePath.includes('node_modules') &&
			!relativePath.startsWith('.') &&
			!relativePath.endsWith('.log')
		)
	})
}

export async function processStreamResponse(
	reader: ReadableStreamDefaultReader<Uint8Array>
): Promise<Suggestion[]> {
	const decoder = new TextDecoder()
	const suggestions: Suggestion[] = []

	while (true) {
		const { done, value } = await reader.read()
		if (done) break

		const chunk = decoder.decode(value)
		const lines = chunk.split('\n\n')
		lines.forEach((line) => {
			if (line.startsWith('data: ')) {
				const data = JSON.parse(line.slice(6))
				suggestions.push(data)
			}
		})
	}

	return suggestions
}

export async function uploadFiles(files: File[], analysisType: string) {
	const formData = new FormData()
	files.forEach((file) => {
		formData.append('codefiles', file)
	})
	formData.append('analysisType', analysisType)

	const customRules = JSON.parse(localStorage.getItem('customRules') || '[]')
	formData.append('customRules', JSON.stringify(customRules))

	const response = await fetch('/api/upload', {
		method: 'POST',
		body: formData,
	})

	if (!response.ok) {
		throw new Error('Failed to upload files')
	}

	return response.body?.getReader()
}
