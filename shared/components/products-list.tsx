'use client'

import { Product } from '@/shared/models/product'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ProductsListProps {
  products: Product[]
  loading: boolean
}

function ProductsList({ products, loading }: ProductsListProps) {
  if (loading) {
    return <div>Loading products...</div>
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-2 p-5 border border-slate-200 shadow rounded"
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
            <span className="text-teal-500 font-bold text-xl">
              ${product.price}
            </span>
          </div>
          <p className="text-sm">{product.description}</p>
          <div className="flex justify-end">
            <Link href={`/${product.id}`}>
              <button className="px-10 py-2 bg-teal-500 text-white rounded shadow text-sm">
                View details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsList
