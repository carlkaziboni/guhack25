import { createFileRoute } from '@tanstack/react-router'
import '@/styles/questions.css'
import { useState } from 'react'

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
})

export async function sendMessage(message: string) {
  const res = await fetch('http://127.0.0.1:8000/chat', {
    method: 'POST',
    body: JSON.stringify({
      message: message,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const data = await res.json()
  return data?.answer
}

export default function RouteComponent() {
  const [message, setMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const answer = sendMessage(message)
    console.log(answer)
  }

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen p-4">
      <div className="flex-grow flex items-center justify-center">
        <h2 className="text-3xl text-[#007bbe] text-center">
          Hi, how can I help you?
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#007bbe]"
          placeholder="Type your message here..."
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
