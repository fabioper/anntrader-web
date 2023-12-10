import type { AppProps } from 'next/app'
import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/soho-light/theme.css'
import 'primeicons/primeicons.css'
import Layout from '@/shared/layout/layout'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <PrimeReactProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PrimeReactProvider>
    </div>
  )
}
