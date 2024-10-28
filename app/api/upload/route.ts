import { NextRequest, NextResponse } from 'next/server'
import { analyzeCodeWithOpenAI } from '@/lib/openai'

export async function POST(request: NextRequest) {
	const formData = await request.formData()
	const files = formData.getAll('codefiles') as File[]
	const analysisType = formData.get('analysisType') as string
	const customRules = JSON.parse(
		(formData.get('customRules') as string) || '[]'
	)

	const encoder = new TextEncoder()
	const stream = new TransformStream()
	const writer = stream.writable.getWriter()

	// Process files in chunks of 3
	const chunkSize = 3
	const processChunk = async (startIndex: number) => {
		const chunk = files.slice(startIndex, startIndex + chunkSize)
		await Promise.all(chunk.map((file) => processFile(file)))
	}

	const processFile = async (file: File) => {
		try {
			const code = await file.text() // Read file content directly without saving
			const refactorSuggestion = await analyzeCodeWithOpenAI(
				code,
				file.name,
				analysisType,
				customRules
			)

			const suggestion = {
				file: file.name,
				suggestions: refactorSuggestion,
				originalCode: code,
			}

			await writer.write(
				encoder.encode(`data: ${JSON.stringify(suggestion)}\n\n`)
			)
		} catch (error) {
			console.error(`Error processing file ${file.name}:`, error)
			await writer.write(
				encoder.encode(
					`data: ${JSON.stringify({
						file: file.name,
						error: 'Failed to process file',
					})}\n\n`
				)
			)
		}
	}

	;(async () => {
		try {
			for (let i = 0; i < files.length; i += chunkSize) {
				await processChunk(i)
			}
		} catch (error) {
			console.error('Error processing files:', error)
		} finally {
			await writer.close()
		}
	})()

	return new NextResponse(stream.readable, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	})
}

export async function GET() {
	return new Response('Method Not Allowed', { status: 405 })
}
