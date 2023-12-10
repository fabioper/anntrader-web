import { Product } from '@/shared/models/product'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import React, { useCallback, useState } from 'react'
import SaveProductModal from '@/shared/components/save-product-modal'
import { confirmDialog } from 'primereact/confirmdialog'
import { deleteProduct } from '@/shared/services/products.service'
import { useProducts } from '@/shared/contexts/products.context'

export default function ProductCard({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loadProducts } = useProducts()

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
        async accept() {
          try {
            setLoading(true)
            await deleteProduct(product.id)
            await loadProducts()
          } catch (e) {
            console.error(e)
          } finally {
            setLoading(false)
          }
        },
      })
    },
    [loadProducts],
  )

  return (
    <div className="flex flex-col gap-5 p-5 bg-surface-card border border-surface-border rounded">
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
        <span className="text-primary font-bold text-xl">${product.price}</span>
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
            onClick={() => setModalOpen(true)}
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
            loading={loading}
          />
        </div>
      </div>

      <SaveProductModal
        visible={modalOpen}
        onHide={() => setModalOpen(false)}
        productId={product.id}
      />
    </div>
  )
}
