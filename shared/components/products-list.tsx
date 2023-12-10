'use client'

import React from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { useProducts } from '@/shared/contexts/products.context'
import ProductCard from '@/shared/components/product-card'

function ProductsList() {
  const { products, loading } = useProducts()

  if (loading) {
    return <div>Loading products...</div>
  }

  if (!products.length) {
    return <div>No products found</div>
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}

      <ConfirmDialog />
    </div>
  )
}

export default ProductsList
