import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

interface Product {
  id: string
  image?: string
  name: string
  description: string
  price: number
}

export async function getProducts() {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export async function getProductBy(productId: string) {
  const { data } = await api.get<Product>(`/products/${productId}`)
  return data
}
