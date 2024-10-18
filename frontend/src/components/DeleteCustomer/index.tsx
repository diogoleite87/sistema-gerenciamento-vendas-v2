import { useState } from "react"

import DeleteDialogComponent from "../DeleteDialog"

import { customerService } from "../../services/customerService"
import { DialogCustomerProps } from "../CustomerContainer"
import { toast } from "react-toastify"

interface IDeleteCustomerProps {
    deleteCustomer: DialogCustomerProps,
    setDeleteCustomer: (state: DialogCustomerProps) => void,
    getCustomers(): void
}

export default function DeleteCustomer({ deleteCustomer, setDeleteCustomer, getCustomers }: IDeleteCustomerProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleCloseDialog = () => setDeleteCustomer({
        openDialog: false,
        customer: undefined
    })

    const handleDeletUser = () => {

        setLoading(true)

        customerService.deleteCustomer(deleteCustomer.customer?.id ?? 0).then(() => {
            toast.success(`${deleteCustomer.customer?.name} deletado com sucesso.`)
            getCustomers()
            handleCloseDialog()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        deleteCustomer.openDialog && <DeleteDialogComponent handleCloseDialog={handleCloseDialog} handleDelete={handleDeletUser} loading={loading} title={deleteCustomer.customer?.name} />
    )
}