import { createFileRoute } from "@tanstack/react-router"
import { user } from "@/lib/server/user"

export const Route = createFileRoute("/logout")({
	beforeLoad: async () => {
		await user.logout()
	},
	preload: false
})
