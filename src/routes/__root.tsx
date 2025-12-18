import css from "@styles/globals.css?url"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { HeroUIProvider } from "@/integrations/heroui/provider"
import { SonnerProvider } from "@/integrations/sonner/provider"
import { user } from "@/lib/server/user"

interface MyRouterContext {
	queryClient: QueryClient
	user: null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		const userData = await user.userData()
		return {
			...userData
		}
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				title: "TanStack Start Starter"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: css
			}
		]
	}),

	shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<head>
				<HeadContent />
			</head>
			<body>
				<div
					className="min-h-screen bg-linear-to-br from-green-200 to-emerald-400"
					style={{
						backgroundImage:
							"radial-gradient(50% 50% at 95% 5%, #34d399 0%, #6ee7b7 70%, #f5f5f5 100%)"
					}}
				>
					<HeroUIProvider>{children}</HeroUIProvider>
				</div>
				<SonnerProvider />
				<TanStackRouterDevtools />
				<Scripts />
			</body>
		</html>
	)
}
