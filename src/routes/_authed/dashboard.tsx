import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { serverDrones } from "@/lib/server/drones"
import { places } from "@/lib/server/places"

export const Route = createFileRoute("/_authed/dashboard")({
	component: RouteComponent
})

function RouteComponent() {
	const { user } = Route.useRouteContext()
	const { data: drone, isPending } = useQuery({
		queryKey: ["drone", user?.id],
		queryFn: () =>
			serverDrones.getAllDrones({
				data: {
					page: 1,
					limit: 10
				}
			})
	})

	const { data: placesis, isPending: placesPending } = useQuery({
		queryKey: ["places"],
		queryFn: () =>
			places.getUserPlacesByUser({
				data: {
					page: 1,
					limit: 10
				}
			})
	})

	console.log(placesis)

	return (
		<div className="grid place-content-center h-screen w-full">
			<div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl">
				<table className="min-w-full text-left text-sm text-zinc-400">
					<thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase text-zinc-500">
						<tr>
							<th className="px-6 py-4 font-semibold">Id</th>
							<th className="px-6 py-4 font-semibold">Model</th>
							<th className="px-6 py-4 font-semibold">Serial</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-800">
						{drone?.map((item) => (
							<tr
								key={item.id}
								className="transition-colors hover:bg-zinc-900/50"
							>
								<td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-200">
									{item.id}
								</td>
								<td className="whitespace-nowrap px-6 py-4">{item.model}</td>
								<td className="whitespace-nowrap px-6 py-4 font-mono text-xs">
									{item.serial}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
