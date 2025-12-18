import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/react"
import { createFileRoute, Outlet } from "@tanstack/react-router"

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
	const navigate = Route.useNavigate()
	return (
		<div>
			<nav className="flex gap-2 p-2 mb-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 sticky top-0 z-20">
				<div className="w-full justify-between flex items-center">
					<Dropdown>
						<DropdownTrigger>
							<Avatar isBordered src="/profile.png" />
						</DropdownTrigger>
						<DropdownMenu
							onAction={(key) => {
								if (key === "exit") {
									navigate({ to: "/logout" })
								}
							}}
						>
							<DropdownItem color="danger" key="exit">
								Logout
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div></div>
			</nav>
			<Outlet />
		</div>
	)
}
