import type { AppProps } from 'next/app'
import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/pages/layout'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
