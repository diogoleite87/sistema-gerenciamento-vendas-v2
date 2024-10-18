import { useState } from "react"

import DeleteDialogComponent from "../DeleteDialog"

import { toast } from "react-toastify"
import { DialogOrderProps } from "../OrderContainer"
import { orderService } from "../../services/orderService"

interface IDeleteOrderProps {
    deleteOrder: DialogOrderProps,
    setDeleteOrder: (state: DialogOrderProps) => void,
    handleDeleteSucess(): void
}

export default function DeleteOrder({ deleteOrder, setDeleteOrder, handleDeleteSucess }: IDeleteOrderProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleCloseDialog = () => setDeleteOrder({
        openDialog: false,
        order: undefined
    })

    const handleDeletUser = () => {

        setLoading(true)

        orderService.deleteOrder(deleteOrder.order?.id ?? 0).then(() => {
            toast.success(`${deleteOrder.order?.id} deletado com sucesso.`)
            handleDeleteSucess()
            handleCloseDialog()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        deleteOrder.openDialog &&
        <DeleteDialogComponent handleCloseDialog={handleCloseDialog} handleDelete={handleDeletUser} loading={loading} title={`Pedido ID: #${deleteOrder.order?.id}`} />
    )
}