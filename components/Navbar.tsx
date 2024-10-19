import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { ModeToggle } from '@/components/DarkLightModeToggleButton'

export default function Navbar() {
	return (
		<nav className='sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link href='/' className='text-2xl font-bold text-primary'>
						Purify
					</Link>
					<div className='flex items-center space-x-4'>
						<Link href='/analyze'>
							<Button variant='ghost'>Analyze</Button>
						</Link>
						<Link href='/suggestions'>
							<Button variant='ghost'>Suggestions</Button>
						</Link>
						<a
							href='https://github.com/babaygt/purify'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Button variant='outline' size='icon'>
								<Github className='h-5 w-5' />
							</Button>
						</a>
						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	)
}
