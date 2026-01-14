import css from "@styles/globals.css?url"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts
} from "@tanstack/react-router"
import { Devtools } from "@/integrations/devtools"
import { SonnerProvider } from "@/integrations/sonner/provider"
import { user } from "@/lib/server/user"

interface MyRouterContext {
	queryClient: QueryClient
	user: null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		return await user.userData()
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
		<html lang="es" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="min-h-screen w-full bg-black relative">
					<div
						className="absolute inset-0 z-0"
						style={{
							background:
								"radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)"
						}}
					>
						{children}
					</div>
				</div>
				<SonnerProvider />
				<Devtools />
				<Scripts />
			</body>
		</html>
	)
}
