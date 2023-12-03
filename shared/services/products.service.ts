import axios from 'axios'
import { Product } from '@/shared/models/product'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function getProductsByQuery(query: string) {
  const { data } = await api.get<Product[]>('/products', {
    params: { search: query },
  })
  return data
}

export async function getProductById(productId: string) {
  const { data } = await api.get<Product>(`/products/${productId}`)
  return data
}
