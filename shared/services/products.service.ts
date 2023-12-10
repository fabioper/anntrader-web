import { Product } from '@/shared/models/product'
import { CreateProductDto } from '@/shared/dtos/create-product.dto'
import { UpdateProductDto } from '@/shared/dtos/update-product.dto'
import { api } from '@/shared/services/api'

export async function getProductsByQuery(query?: string) {
  const { data } = await api.get<Product[]>('/products', {
    params: { search: query },
  })
  return data
}

export async function getProductById(productId: string) {
  const { data } = await api.get<Product>(`/products/${productId}`)
  return data
}

export async function createProduct(data: CreateProductDto, token: string) {
  await api.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function updateProduct(productId: string, data: UpdateProductDto) {
  await api.put(`/products/${productId}`, data)
}

export async function deleteProduct(productId: string) {
  await api.delete(`/products/${productId}`)
}
