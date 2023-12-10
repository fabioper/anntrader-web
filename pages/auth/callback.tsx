import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await router.push('/')
    })()
  }, [router])

  return <></>
}
