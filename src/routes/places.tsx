import { Button } from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"
import { places } from "@/lib/server/places"
import { user } from "@/lib/server/user"

export const Route = createFileRoute("/places")({
	component: RouteComponent
})

function RouteComponent() {
	const submitUser = async () => {
		const userId = await user.userData()
		await places.insertUserPlace({
			data: {
				name: "Place 1",
				description: "A nice place",
				coord_x: "40.7128",
				coord_y: "-74.0060",
				id_user: userId.user?.id as string, // Replace with actual user ID
				hidden_place: false
			}
		})
	}

	const fetchPlaces = async () => {
		const allPlacesByUser = await places.getUserPlacesById()
		console.log(allPlacesByUser)
	}

	return (
		<div>
			<Button onPress={fetchPlaces}>Click</Button>
		</div>
	)
}
