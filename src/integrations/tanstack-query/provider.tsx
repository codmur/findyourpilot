import { type QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface TQueryProviderProps {
	children: React.ReactNode
	queryClient: QueryClient
}

export function QueryProvider({ children, queryClient }: TQueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
