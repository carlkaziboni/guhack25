import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/graduate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/graduate"!</div>
}
