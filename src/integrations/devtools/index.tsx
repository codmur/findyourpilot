import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

export const Devtools = () => {
	return (
		<TanStackDevtools
			plugins={[
				{
					name: "Query Devtools",
					render: <ReactQueryDevtoolsPanel />
				},
				{
					name: "Router Devtools",
					render: <TanStackRouterDevtoolsPanel />
				}
			]}
		/>
	)
}
