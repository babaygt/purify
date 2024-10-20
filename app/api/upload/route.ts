import { NextRequest, NextResponse } from 'next/server'
import { analyzeCodeWithOpenAI } from '@/lib/openai'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
	const formData = await request.formData()
	const files = formData.getAll('codefiles') as File[]
	const analysisType = formData.get('analysisType') as string
	const customRules = JSON.parse(
		(formData.get('customRules') as string) || '[]'
	)
	const uploadDir = join(process.cwd(), 'uploads')
	// Create the uploads directory if it doesn't exist
	try {
		await mkdir(uploadDir, { recursive: true })
	} catch (error) {
		console.error('Error creating uploads directory:', error)
		return NextResponse.json(
			{ error: 'Failed to create uploads directory' },
			{ status: 500 }
		)
	}
	const encoder = new TextEncoder()
	const stream = new TransformStream()
	const writer = stream.writable.getWriter()
	const processFile = async (file: File) => {
		try {
			const bytes = await file.arrayBuffer()
			const buffer = Buffer.from(bytes)
			const filePath = join(uploadDir, file.name)
			await writeFile(filePath, buffer)
			const code = buffer.toString('utf-8')
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
			for (const file of files) {
				await processFile(file)
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
