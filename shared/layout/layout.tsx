import { PropsWithChildren } from 'react'
import Header from '@/shared/components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
