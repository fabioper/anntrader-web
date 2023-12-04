import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className="border-b border-b-slate-200 mb-10">
      <div className="container py-5">
        <Link href="/">
          <h1 className="font-bold">ANN Trader</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
