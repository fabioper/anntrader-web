'use client'

import { Product } from '@/shared/models/product'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'

interface ProductsListProps {
  products: Product[]
  loading: boolean
}

function ProductsList({ products, loading }: ProductsListProps) {
  if (loading) {
    return <div>Loading products...</div>
  }

  if (!products.length) {
    return <div>No products found</div>
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-5 p-5 bg-surface-card border border-surface-border rounded"
        >
          {product.image && (
            <Image
              src={product.image}
              alt={product.description}
              width={250}
              height={250}
              className="w-full max-h-56 object-contain"
            />
          )}
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{product.name}</h3>
            <span className="text-primary font-bold text-xl">
              ${product.price}
            </span>
          </div>

          <p className="text-sm">{product.description}</p>

          <div className="flex justify-between gap-2">
            <Link href={`/${product.id}`}>
              <Button size="small" outlined>
                Open product
              </Button>
            </Link>

            <div className="flex gap-2">
              <Button
                size="small"
                severity="info"
                outlined
                rounded
                icon={PrimeIcons.PENCIL}
                tooltip="Edit product"
                tooltipOptions={{ position: 'bottom' }}
              />

              <Button
                size="small"
                severity="danger"
                outlined
                rounded
                icon={PrimeIcons.TRASH}
                tooltip="Delete product"
                tooltipOptions={{ position: 'bottom' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsList
