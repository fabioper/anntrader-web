import { Dialog } from 'primereact/dialog'
import React, { useCallback, useState } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { useForm } from 'react-hook-form'
import { CreateProductDto } from '@/shared/dtos/create-product.dto'
import { createProduct } from '@/shared/services/products.service'

export interface SaveProductModalProps {
  visible: boolean
  onHide: () => void
}

function SaveProductModal({ visible, onHide }: SaveProductModalProps) {
  const { handleSubmit, register, watch, setValue, reset } =
    useForm<CreateProductDto>()
  const [loading, setLoading] = useState(false)

  const priceValue = watch('price')

  const onSubmit = useCallback(
    async (values: CreateProductDto) => {
      try {
        setLoading(true)
        await createProduct(values)
        onHide()
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
        reset()
      }
    },
    [onHide, reset],
  )

  return (
    <Dialog
      header="Save Product"
      onHide={onHide}
      visible={visible}
      draggable={false}
      className="w-full max-w-prose"
    >
      <form
        className="flex flex-col gap-3 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col gap-1">
          Nome
          <InputText {...register('name')} />
        </label>

        <label className="flex flex-col gap-1">
          Description
          <InputTextarea {...register('description')} />
        </label>

        <label className="flex flex-col gap-1">
          Price
          <InputNumber
            mode="currency"
            currency="USD"
            locale="en-US"
            value={priceValue}
            onValueChange={(e) => setValue('price', e.value as number)}
          />
        </label>

        <div className="flex gap-1 justify-end">
          <Button
            label="Cancelar"
            severity="info"
            outlined
            className="m-0"
            type="button"
            onClick={onHide}
          />

          <Button
            label="Confirmar"
            severity="success"
            icon={PrimeIcons.CHECK}
            className="m-0"
            type="submit"
            loading={loading}
          />
        </div>
      </form>
    </Dialog>
  )
}

export default SaveProductModal
