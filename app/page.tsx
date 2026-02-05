import Soroban from './components/Soroban';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 p-4">
      <h1 className="text-4xl font-bold text-amber-900 mb-8 font-serif">Soroban Viz</h1>
      <Soroban />
      <p className="mt-12 text-amber-800/60 text-sm">Educational Fleet: App 1/11</p>
    </div>
  )
}
