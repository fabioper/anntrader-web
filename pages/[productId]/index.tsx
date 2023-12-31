import { getProductById } from '@/shared/services/products.service'
import React, { useCallback, useEffect, useState } from 'react'
import { Product } from '@/shared/models/product'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'

function useProduct(productId: string | undefined) {
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
      if (productId) {
        await loadProduct(productId)
      }
    })()

    return () => setProduct(undefined)
  }, [loadProduct, productId])

  return { product, loading }
}

export default function ProductDetailsPage() {
  const router = useRouter()
  const { productId } = router.query as Partial<{ productId: string }>
  const { product, loading } = useProduct(productId)

  if (!product && !loading) {
    return <div className="container">Product not found</div>
  }

  if (!product) {
    return <div className="container">Loading product details</div>
  }

  return (
    <main>
      <Head>
        <title>{product.name} | ANN Trader</title>
      </Head>

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
          <span className="text-4xl text-primary">${product.price}</span>
          <p className="text-sm text-text-color-secondary">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  )
}
