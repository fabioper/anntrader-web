import { api } from '@/shared/services/api'

export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', file.name)

  try {
    const { data } = await api.post('/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data.url
  } catch (e) {
    console.error(e)
  }
}
