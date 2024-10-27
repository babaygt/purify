interface PageContainerProps {
	title: string
	children: React.ReactNode
	className?: string
}

export function PageContainer({
	title,
	children,
	className = '',
}: PageContainerProps) {
	return (
		<div className='bg-background text-foreground min-h-screen'>
			<div className={`container mx-auto p-4 sm:p-6 lg:p-8 ${className}`}>
				<h1 className='text-4xl font-bold mb-8 text-center'>{title}</h1>
				{children}
			</div>
		</div>
	)
}
