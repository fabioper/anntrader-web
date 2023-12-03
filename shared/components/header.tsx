import React from 'react'

function Header() {
  return (
    <header className="border-b border-b-slate-200 mb-10">
      <div className="container py-5">
        <h1 className="font-bold">ANN Trader</h1>
      </div>
    </header>
  )
}

export default React.cache(Header)
