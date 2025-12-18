import { createRouter } from "@tanstack/react-router"
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"
import { createQueryContext } from "./integrations/tanstack-query/context.tsx"
import { QueryProvider } from "./integrations/tanstack-query/provider.tsx"
import { routeTree } from "./routeTree.gen.ts"

export const getRouter = () => {
	const { queryClient } = createQueryContext()

	const router = createRouter({
		routeTree,
		context: { queryClient, user: null },
		defaultPreload: "intent",
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<QueryProvider {...{ queryClient }}>{props.children}</QueryProvider>
			)
		}
	})

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
		handleRedirects: true,
		wrapQueryClient: false
	})

	return router
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
