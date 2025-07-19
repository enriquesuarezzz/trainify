import Header from '@/components/molecules/header/header'
import TodaysClasses from '@/components/todays_classes/todays_classes'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10">
      <Header />
      <TodaysClasses />
    </main>
  )
}
