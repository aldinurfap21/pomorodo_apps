import Timer from "@/components/Timer"

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Pomodoro Timer
        </h1>
        
        <Timer />
      </div>
    </main>
  )
}