'use client'

import { PropsWithChildren } from 'react'
import { AuthProvider } from 'oidc-react'

export default function AuthenticationContext({ children }: PropsWithChildren) {
  const authority = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  const redirectUri = window.location.origin + '/auth/callback'

  return (
    <AuthProvider
      authority={authority}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      {children}
    </AuthProvider>
  )
}
