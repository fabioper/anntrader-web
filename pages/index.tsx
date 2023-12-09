import {
  deleteProduct,
  getProductsByQuery,
} from '@/shared/services/products.service'
import React, { useCallback, useEffect, useState } from 'react'
import { Product } from '@/shared/models/product'
import ProductsList from '@/shared/components/products-list'
import Head from 'next/head'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import SaveProductModal from '@/shared/components/save-product-modal'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const loadProducts = useCallback(async (query?: string) => {
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

  useEffect(() => {
    ;(async () => loadProducts())()
  }, [loadProducts])

  return (
    <main>
      <Head>
        <title>ANN Trader</title>
      </Head>

      <section className="container">
        <h2 className="font-bold text-xl mb-5">Products</h2>

        <div className="flex justify-between my-5">
          <form className="flex gap-2" onSubmit={searchProducts}>
            <InputText
              type="text"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              placeholder="Search product"
            />
            <Button type="submit" size="small">
              Search
            </Button>
          </form>

          <Button
            type="button"
            size="small"
            onClick={() => setModalVisible(true)}
          >
            Add product
          </Button>
        </div>

        <ProductsList
          products={products}
          loading={loading}
          onProductRemove={async (product) => {
            try {
              setLoading(true)
              await deleteProduct(product.id)
              await loadProducts(query)
            } catch (e) {
              console.error(e)
            } finally {
              setLoading(false)
            }
          }}
        />

        <SaveProductModal
          visible={modalVisible}
          onHide={async () => {
            setModalVisible(false)
            await loadProducts(query)
          }}
        />
      </section>
    </main>
  )
}
