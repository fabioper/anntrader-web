'use client'

import { getProductById } from '@/shared/services/products.service'
import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/shared/models/product'
import { notFound } from 'next/navigation'

interface ProductDetailsPageProps {
  params: { productId: string }
}

export default function ProductDetailsPage({
  params: { productId },
}: ProductDetailsPageProps) {
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)

  const loadProduct = useCallback(async (productId: string) => {
    try {
      setLoading(true)
      setProduct(await getProductById(productId))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      await loadProduct(productId)
    })()

    return () => setProduct(undefined)
  }, [loadProduct, productId])

  if (!product && !loading) {
    return notFound()
  }

  if (!product) {
    return <div className="container">Loading product details</div>
  }

  return (
    <main>
      <div className="container">
        <h2 className="font-bold">{product.name}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
    </main>
  )
}
