import { useState } from "react"
import DeleteDialogComponent from "../DeleteDialog"
import { DialogUserProps } from "../UserContainer"
import { userService } from "../../services/userService"
import { toast } from "react-toastify"

interface IDeleteUserProps {
    deleteUser: DialogUserProps,
    setDeleteUser: (state: DialogUserProps) => void,
    getUsers(): void
}

export default function DeleteUser({ deleteUser, setDeleteUser, getUsers }: IDeleteUserProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleCloseDialog = () => setDeleteUser({
        openDialog: false,
        user: undefined
    })

    const handleDeletUser = () => {

        setLoading(true)

        userService.deleteUser(deleteUser.user?.id ?? '').then(() => {
            toast.success(`${deleteUser.user?.name} deletado com sucesso.`)
            getUsers()
            handleCloseDialog()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        deleteUser.openDialog && <DeleteDialogComponent handleCloseDialog={handleCloseDialog} handleDelete={handleDeletUser} loading={loading} title={deleteUser.user?.name} />
    )
}