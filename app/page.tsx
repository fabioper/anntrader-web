import { getProducts } from '@/shared/services/products.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main>
      <div className="container">
        <h2 className="font-bold text-xl mb-5">Products</h2>

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
                />
              )}
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{product.name}</h3>
                <span>${product.price}</span>
              </div>
              <p className="text-sm">{product.description}</p>
              <div className="flex justify-end">
                <Link href={`/${product.id}`}>
                  <button className="px-10 py-2 bg-teal-500 text-white rounded shadow">
                    Detalhes
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
