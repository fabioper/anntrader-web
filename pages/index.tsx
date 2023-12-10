import React, { useState } from 'react'
import ProductsList from '@/shared/components/products-list'
import Head from 'next/head'
import { Button } from 'primereact/button'
import SaveProductModal from '@/shared/components/save-product-modal'
import ProductsProvider from '@/shared/contexts/products.context'
import SearchProductsInput from '@/shared/components/search-products-input'

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <main>
      <Head>
        <title>ANN Trader</title>
      </Head>

      <section className="container">
        <h2 className="font-bold text-3xl mb-5">Products</h2>

        <ProductsProvider>
          <div className="flex justify-between my-5">
            <SearchProductsInput />

            <Button
              type="button"
              size="small"
              onClick={() => setModalVisible(true)}
            >
              Add product
            </Button>
          </div>

          <ProductsList />

          <SaveProductModal
            visible={modalVisible}
            onHide={() => setModalVisible(false)}
          />
        </ProductsProvider>
      </section>
    </main>
  )
}
