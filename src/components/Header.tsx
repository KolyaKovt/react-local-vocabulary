import { ReactNode } from "react"

interface Props {
  children: ReactNode
  full: boolean
}

export const Header = ({ children, full }: Props) => {
  return (
    <header
      className={`sticky ${
        full ? "min-w-[100%]" : "min-w-[280px]"
      } py-6 top-0 bg-[#1d232a]`}
    >
      {children}
    </header>
  )
}
