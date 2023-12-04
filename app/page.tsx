'use client'

import { getProductsByQuery } from '@/shared/services/products.service'
import ProductsList from '@/app/products-list'
import React, { useCallback, useState } from 'react'
import { Product } from '@/shared/models/product'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const loadProducts = useCallback(async (query: string) => {
    setLoading(true)
    try {
      const productsData = await getProductsByQuery(query)
      setProducts(productsData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchProducts = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      await loadProducts(query)
    },
    [loadProducts, query],
  )

  return (
    <main>
      <div className="container">
        <h2 className="font-bold text-xl mb-5">Products</h2>

        <form className="my-5 flex gap-2" onSubmit={searchProducts}>
          <input
            type="text"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            placeholder="Search product"
            className="border border-slate-300 rounded bg-slate-50 p-2 w-full max-w-prose"
          />
          <button
            type="submit"
            className="bg-teal-500 rounded px-5 text-white shadow text-sm"
          >
            Search
          </button>
        </form>

        <ProductsList products={products} loading={loading} />
      </div>
    </main>
  )
}
