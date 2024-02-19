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
      } py-6 top-0 bg-gradient-to-b from-base-100 via-base-100 via-95% to-transparent`}
    >
      {children}
    </header>
  )
}
