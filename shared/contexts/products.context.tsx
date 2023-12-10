import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Product } from '@/shared/models/product'
import { getProductsByQuery } from '@/shared/services/products.service'

interface ProductsContextProps {
  products: Product[]
  query: string
  setQuery: (query: string) => void
  loading: boolean
  loadProducts: () => Promise<void>
}

const ProductsContext = createContext<ProductsContextProps | null>(null)

export default function ProductsProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const productsData = await getProductsByQuery(query)
      setProducts(productsData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    ;(async () => loadProducts())()
  }, [loadProducts])

  return (
    <ProductsContext.Provider
      value={{
        query,
        setQuery,
        loadProducts,
        loading,
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const value = useContext(ProductsContext)

  if (value === null) {
    throw new Error('useProducts cannot be used outside a ProductsProvider')
  }

  return value
}
