import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Trainify</h1>
      <Image
        src="/trainify-logo.png"
        alt="Trainify Logo"
        width={200}
        height={200}
      />
      <p className="mt-4 text-lg">Your journey to fitness starts here!</p>
    </main>
  )
}
