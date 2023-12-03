import { getProductBy } from '@/shared/services/products.service'

export default async function ProductDetailsPage({
  params: { productId },
}: {
  params: { productId: string }
}) {
  const product = await getProductBy(productId)

  return (
    <main>
      <div className="container">
        <h2 className="font-bold">{product.name}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
    </main>
  )
}
