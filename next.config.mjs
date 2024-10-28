/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/api/upload',
				headers: [
					{
						key: 'Connection',
						value: 'keep-alive',
					},
				],
			},
		]
	},
}

export default nextConfig
