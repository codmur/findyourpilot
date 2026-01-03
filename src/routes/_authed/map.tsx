import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/map"!</div>
}
