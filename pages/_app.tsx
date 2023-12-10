import type { AppProps } from 'next/app'
import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/soho-light/theme.css'
import 'primeicons/primeicons.css'
import Layout from '@/shared/layout/layout'
import dynamic from 'next/dynamic'

const AuthProvider = dynamic(
  () => import('@/shared/contexts/authentication-provider'),
  { ssr: false },
)

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <AuthProvider>
        <PrimeReactProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PrimeReactProvider>
      </AuthProvider>
    </div>
  )
}
