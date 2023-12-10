'use client'

import { Product } from '@/shared/models/product'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import SaveProductModal from '@/shared/components/save-product-modal'

interface ProductsListProps {
  products: Product[]
  loading: boolean
  onProductRemove: (product: Product) => void
  onProductUpdate: () => void
}

function ProductsList({
  products,
  loading,
  onProductRemove,
  onProductUpdate,
}: ProductsListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const confirmProductRemoval = useCallback(
    (product: Product) => {
      confirmDialog({
        header: `Are you sure you want to delete ${product.name}?`,
        acceptIcon: PrimeIcons.TRASH,
        acceptClassName: 'p-button-danger',
        rejectClassName: 'p-button-outlined p-button-danger mr-2',
        acceptLabel: 'Yep, delete it',
        rejectLabel: 'Never mind',
        draggable: false,
        accept: () => onProductRemove(product),
      })
    },
    [onProductRemove],
  )

  if (loading) {
    return <div>Loading products...</div>
  }

  if (!products.length) {
    return <div>No products found</div>
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
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
              className="w-full h-56 object-cover"
            />
          )}

          <div className="flex justify-between items-center">
            <Link href={`/${product.id}`} className="hover:underline">
              <h3 className="font-bold">{product.name}</h3>
            </Link>
            <span className="text-primary font-bold text-xl">
              ${product.price}
            </span>
          </div>

          <p className="text-sm">{product.description}</p>

          <div className="flex justify-end gap-2">
            <div className="flex gap-2">
              <Button
                size="small"
                severity="info"
                outlined
                rounded
                icon={PrimeIcons.PENCIL}
                tooltip="Edit product"
                tooltipOptions={{ position: 'bottom' }}
                onClick={() => setSelectedProduct(product)}
              />

              <Button
                size="small"
                severity="danger"
                outlined
                rounded
                icon={PrimeIcons.TRASH}
                tooltip="Delete product"
                tooltipOptions={{ position: 'bottom' }}
                onClick={() => confirmProductRemoval(product)}
              />
            </div>
          </div>
        </div>
      ))}

      <SaveProductModal
        visible={!!selectedProduct}
        onHide={async () => {
          setSelectedProduct(undefined)
          onProductUpdate()
        }}
        productId={selectedProduct?.id}
      />
      <ConfirmDialog />
    </div>
  )
}

export default ProductsList
