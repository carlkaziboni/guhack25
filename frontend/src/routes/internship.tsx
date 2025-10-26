import Questions from '@/components/Questions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/internship')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Questions />
}
