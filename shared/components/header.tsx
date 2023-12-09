import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className="border-b border-b-surface-border mb-10">
      <div className="container py-5 flex items-center justify-between">
        <h1 className="font-bold">
          <Link href="/">ANN Trader</Link>
        </h1>
      </div>
    </header>
  )
}

export default Header
