import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center mx-auto max-w-[575px] px-5">
      {children}
    </div>
  )
}
