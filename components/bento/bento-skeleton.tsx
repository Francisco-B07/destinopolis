import { SpinnerMessage } from '@/components/stocks/message'
const BentoSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-1 mb-1  p-2 rounded-md">
        <SpinnerMessage />
        <p className="font-semibold">
          Estamos generando información para tu viaje...
        </p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-green-400">
        <div className="flex gap-2 mb-2">
          <div
            className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
            data-placeholder
          >
            xxxxxxxxxxxxxx
          </div>
          <div
            className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
            data-placeholder
          >
            xxxxxxxxx
          </div>
          <div
            className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
            data-placeholder
          >
            xxxxxxj
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div
              className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
              data-placeholder
            >
              xxxxxxxx
            </div>
            <div
              className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
              data-placeholder
            >
              xxxxxxxx
            </div>
            <div
              className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
              data-placeholder
            >
              xxxxxxxx
            </div>
            <div
              className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-14"
              data-placeholder
            >
              xxxxxxxx
            </div>
          </div>
          <div
            className="overflow-hidden relative w-fit rounded-md bg-zinc-700 text-3xl font-bold text-transparent h-[248px]"
            data-placeholder
          >
            xxxxxxxxxxxxxxxxxxxxxx
          </div>
        </div>
      </div>
    </div>
  )
}

export default BentoSkeleton
