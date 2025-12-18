import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/dashboard")({
	component: RouteComponent
})

function RouteComponent() {
	const { user } = Route.useRouteContext()
	console.log(user)
	return <div>Dashboard</div>
}
