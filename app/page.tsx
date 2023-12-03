'use client'

import { getProductsByQuery } from '@/shared/services/products.service'
import ProductsList from '@/app/products-list'
import React, { useEffect, useState } from 'react'
import { Product } from '@/shared/models/product'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function loadProducts(query: string) {
    setLoading(true)
    try {
      const productsData = await getProductsByQuery(query)
      setProducts(productsData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => await loadProducts(query))()

    return () => setProducts([])
  }, [query])

  return (
    <main>
      <div className="container">
        <h2 className="font-bold text-xl mb-5">Products</h2>

        <form className="my-5">
          <input
            type="text"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            placeholder="Search product"
            className="border border-slate-300 rounded bg-slate-50 p-2 w-full max-w-prose"
          />
        </form>

        <ProductsList products={products} loading={loading} />
      </div>
    </main>
  )
}
