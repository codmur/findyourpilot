import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Popover,
	PopoverContent,
	PopoverDialog,
	PopoverTrigger,
	Tab,
	TabIndicator,
	TabList,
	TabListContainer,
	Tabs
} from "@heroui/react"
import { useNavigate } from "@tanstack/react-router"

export const Sidebar = () => {
	const navigate = useNavigate()

	const onSelection = (key: string | number) => {
		if (key === "exit") {
			navigate({ to: "/logout" })
		}

		if (key === "home") {
			navigate({ to: "/dashboard", viewTransition: true })
		}

		if (key === "map") {
			navigate({ to: "/map", viewTransition: true })
		}
	}

	return (
		<aside className="absolute left-4 top-4 bottom-4 w-20 bg-[#111418]/90 backdrop-blur-xl border border-border-dark rounded-2xl flex flex-col items-center py-6 gap-8 z-50 shadow-2xl">
			<div className="bg-accent-soft-hover rounded-xl flex p-2 items-center justify-center mb-2 shadow-inner shadow-accent/5">
				<span className="iconify solar--plain-bold size-8 text-accent" />
			</div>

			<nav className="flex flex-col gap-6 w-full items-center flex-1 justify-center">
				<Tabs orientation="vertical" onSelectionChange={onSelection}>
					<TabListContainer>
						<TabList className="bg-transparent w-20 gap-4 *:data-selected:text-accent transition-all duration-500 ease-in-out">
							<Tab
								id="home"
								className="w-20 data-selected:*:nth-1:bg-accent-soft-hover"
							>
								<div className="rounded-xl flex p-2 items-center justify-center mb-2 shadow-inner shadow-accent/5">
									<span className="iconify solar--home-2-bold size-6" />
								</div>
								<TabIndicator className="w-1  bg-accent -left-1.5" />
							</Tab>
							<Tab
								id="map"
								className="w-20 data-selected:*:nth-1:bg-accent-soft-hover "
							>
								<div className="rounded-xl flex p-2 items-center justify-center mb-2 shadow-inner shadow-accent/5">
									<span className="iconify solar--map-bold size-6" />
								</div>
								<TabIndicator className="w-1 bg-accent -left-1.5" />
							</Tab>
						</TabList>
					</TabListContainer>
				</Tabs>
			</nav>

			<div className="flex flex-col gap-6 items-center">
				<Popover>
					<PopoverTrigger>
						<Avatar>
							<AvatarImage
								alt="User"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxXq4bRxrJ_K7LGaokjaeKjmRj1wwnIy2kWR33xvFRYDVS1sX-5AOswfvq-VZYlvtzNhu7b8scqcT5rl23DLLrA54SNxiOQdmzNdzOSmMDokDXTPLMRHfI1GUY1tncm5wBiVM6c8QBpBT0yTE3TiM1z0vC_ZTFVRQAP2Rk3L2_x3X9IvxMdZD_RyoUiyUwM3iBjMozCXgXI1m6NXccMAp3OACJd4a5cBe-4gXzMUGrRzUH8WHZPhrevYi43vzwcoK0fQS00Z1m4I"
							/>
							<AvatarFallback>
								<span className="iconify solar--user-bold size-6" />
							</AvatarFallback>
						</Avatar>
					</PopoverTrigger>
					<PopoverContent
						placement="right"
						offset={20}
						className="bg-[#111418]/90"
					>
						<PopoverDialog>
							<Button variant="danger-soft" onPress={() => onSelection("exit")}>
								Logout
							</Button>
						</PopoverDialog>
					</PopoverContent>
				</Popover>
			</div>
		</aside>
	)
}
