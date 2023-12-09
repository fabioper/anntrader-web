import { Dialog } from 'primereact/dialog'
import React, {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'

export interface SaveProductModalRef {
  open: () => void
  hide: () => void
}

function SaveProductModal(_: {}, ref: ForwardedRef<SaveProductModalRef>) {
  const [visible, setVisible] = useState(false)

  const onHide = useCallback(() => {
    setVisible(false)
  }, [])

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true)
      return ref
    },
    hide() {
      setVisible(false)
      return ref
    },
  }))

  const footer = useMemo(
    () => (
      <div className="flex gap-1 justify-end">
        <Button label="Cancelar" severity="info" outlined className="m-0" />
        <Button
          label="Confirmar"
          severity="success"
          icon={PrimeIcons.CHECK}
          className="m-0"
        />
      </div>
    ),
    [],
  )

  return (
    <Dialog
      header="Save Product"
      onHide={onHide}
      visible={visible}
      draggable={false}
      footer={footer}
    >
      SaveProductModal
    </Dialog>
  )
}

export default React.forwardRef(SaveProductModal)
