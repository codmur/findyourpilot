import logo from "@assets/logo.svg"
import { Button } from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: App
})

function App() {
	const navigate = Route.useNavigate()
	return (
		<div className="text-center">
			<header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
				<img
					src={logo}
					className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
					alt="logo"
				/>
				<p>
					Edit <code>src/routes/index.tsx</code> and save to reload.
				</p>
				<div className="grid grid-cols-2 gap-4 mt-4">
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
			</header>
		</div>
	)
}
