import { Toaster } from "sonner"

export const SonnerProvider = () => {
	return (
		<Toaster
			position="top-right"
			duration={3000}
			closeButton
			richColors
			visibleToasts={3}
		/>
	)
}
