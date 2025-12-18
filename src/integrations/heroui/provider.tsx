import { HeroUIProvider as HeroProvider } from "@heroui/react"

export const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
	return <HeroProvider validationBehavior="native">{children}</HeroProvider>
}
