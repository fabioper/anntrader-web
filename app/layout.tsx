import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANN Traders',
  description:
    'ANN Traders is a Boston-based company, which focuses on e-commerce solutions for customers across  the globe',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
