import { useState } from "react"

import DeleteDialogComponent from "../DeleteDialog"

import { toast } from "react-toastify"
import { DialogItemProps } from "../ItemContainer"
import { itemService } from "../../services/itemService"

interface IDeleteItemProps {
    deleteItem: DialogItemProps,
    setDeleteItem: (state: DialogItemProps) => void,
    getItems(): void
}

export default function DeleteItem({ deleteItem, setDeleteItem, getItems }: IDeleteItemProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleCloseDialog = () => setDeleteItem({
        openDialog: false,
        item: undefined
    })

    const handleDeletUser = () => {

        setLoading(true)

        itemService.deleteItem(deleteItem.item?.id ?? 0).then(() => {
            toast.success(`${deleteItem.item?.name} deletado com sucesso.`)
            getItems()
            handleCloseDialog()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        deleteItem.openDialog &&
        <DeleteDialogComponent handleCloseDialog={handleCloseDialog} handleDelete={handleDeletUser} loading={loading} title={deleteItem.item?.name} />
    )
}