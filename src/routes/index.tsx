import { Button } from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: App
})

function App() {
	const navigate = Route.useNavigate()
	return (
		<div className="min-h-screen grid place-content-center">
			<div className="flex gap-4">
				<Button
					onPress={() =>
						navigate({
							to: "/login"
						})
					}
				>
					Login
				</Button>
				<Button
					onPress={() => {
						navigate({
							to: "/signup"
						})
					}}
				>
					Signup
				</Button>
			</div>
		</div>
	)
}
