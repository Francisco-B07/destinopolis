import { IconArrowRight } from '@/icons'

export const CustomBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="relative flex overflow-hidden rounded-full p-[3px]  justify-center items-center text-center ">
      <span className="absolute  inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#FFAA00_50%,#FFD700_100%)]  "></span>
      <div className=" inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-6 py-2.5 text-lg  text-[#151515] font-medium  backdrop-blur-3xl hover:bg-yellow-50/60 hover:text-gray-700 transition-all duration-300 ease-in-out">
        {children} <IconArrowRight className="ml-4 " />
      </div>
    </span>
  )
}
