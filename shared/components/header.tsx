import React, { useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from 'oidc-react'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'
import { PrimeIcons } from 'primereact/api'

function Header() {
  const { userData } = useAuth()
  const router = useRouter()

  const signOut = useCallback(async () => {
    const cognitoHost = process.env.NEXT_PUBLIC_COGNITO_HOST
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI
    const logoutUri = `${cognitoHost}/logout?client_id=${clientId}&logout_uri=${redirectUri}&redirect_uri=${redirectUri}&response_type=code`

    await router.push(logoutUri)
  }, [router])

  return (
    <header className="border-b border-b-surface-border mb-10">
      <div className="container py-5 flex items-center justify-between">
        <h1 className="font-bold">
          <Link href="/">ANN Trader</Link>
        </h1>

        {userData && (
          <div className="flex items-center gap-5">
            Logado como: {userData.profile.name}{' '}
            <Button
              severity="danger"
              size="small"
              className="p-2"
              label="Logout"
              icon={PrimeIcons.SIGN_OUT}
              onClick={signOut}
            />{' '}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
