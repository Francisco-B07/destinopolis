export const CustomBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="relative flex overflow-hidden rounded-full p-[3px]  h-10 ">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#FFAA00_50%,#FFD700_100%)]"></span>
      <div className=" inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#eeeeee] px-6 py-2 text-sm  text-[#151515] font-medium  backdrop-blur-3xl">
        {children}
      </div>
    </span>
  )
}
