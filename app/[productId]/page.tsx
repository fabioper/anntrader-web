'use client'

import { getProductById } from '@/shared/services/products.service'
import React, { useCallback, useEffect, useState } from 'react'
import { Product } from '@/shared/models/product'
import { notFound } from 'next/navigation'
import Image from 'next/image'

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
      <div className="container flex flex-col md:flex-row gap-10">
        {product.image && (
          <Image
            src={product.image}
            alt={product.description}
            width={250}
            height={250}
            className="min-w-[250px] border p-5 max-h-56 object-contain"
          />
        )}

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-3xl">{product.name}</h2>
          <span className="text-4xl text-teal-500">${product.price}</span>
          <p className="text-sm text-slate-800">{product.description}</p>
        </div>
      </div>
    </main>
  )
}
