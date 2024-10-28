import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, RefreshCw, TrendingUp } from 'lucide-react'

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10'>
			<main className='max-w-5xl mx-auto'>
				<h1 className='text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
					Purify<span className='text-primary'>.today</span>
				</h1>
				<p className='text-3xl font-semibold mb-8 text-foreground/80'>
					Because tomorrow&apos;s code deserves today&apos;s excellence
				</p>
				<div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
					<Link href='/analyze'>
						<Button size='lg' className='group'>
							Start Purifying
							<ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
						</Button>
					</Link>
					<Link href='https://github.com/babaygt/purify'>
						<Button variant='outline' size='lg'>
							Learn More
						</Button>
					</Link>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
					{[
						{
							title: 'Instant Analysis',
							icon: Zap,
							description: "Get immediate insights into your code's health",
						},
						{
							title: 'Smart Refactoring',
							icon: RefreshCw,
							description:
								'AI-powered suggestions for cleaner, more efficient code',
						},
						{
							title: 'Continuous Improvement',
							icon: TrendingUp,
							description:
								'Track your progress and keep your codebase pristine',
						},
					].map((feature, index) => (
						<div key={index} className='bg-card p-6 rounded-lg shadow-lg'>
							<feature.icon className='w-12 h-12 mb-4 text-primary' />
							<h2 className='text-xl font-bold mb-2'>{feature.title}</h2>
							<p className='text-muted-foreground'>{feature.description}</p>
						</div>
					))}
				</div>
			</main>
		</div>
	)
}
