import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Sidebar } from "@/components/sections/Sidebar"

export const Route = createFileRoute("/_authed")({
	beforeLoad: ({ context }) => {
		if (context.error) {
			throw new Error("Not authenticated")
			// TODO: Redirect to login page
		}
	},
	errorComponent: ({ error }) => {
		if (error.message === "Not authenticated") {
			return (
				<p>
					Not authenticated. Please <a href="/login">login</a>.
				</p>
			)
		}
		throw error
	},
	component: RouteComponent
})

function RouteComponent() {
	return (
		<div>
			<Sidebar />
			<Outlet />
		</div>
	)
}
