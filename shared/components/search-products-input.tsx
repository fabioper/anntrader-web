import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import React, { useCallback, useState } from 'react'
import { useProducts } from '@/shared/contexts/products.context'
import { PrimeIcons } from 'primereact/api'

export default function SearchProductsInput() {
  const [search, setSearch] = useState('')
  const { setQuery } = useProducts()

  const searchProducts = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setQuery(search)
    },
    [search, setQuery],
  )

  return (
    <form className="flex gap-2" onSubmit={searchProducts}>
      <InputText
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        placeholder="Search product"
      />
      <Button
        type="submit"
        size="small"
        icon={PrimeIcons.SEARCH}
        severity="info"
      />
    </form>
  )
}
