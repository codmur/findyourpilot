import { QueryClient } from "@tanstack/react-query"

export function createQueryContext() {
	const queryClient = new QueryClient()
	return {
		queryClient
	}
}
