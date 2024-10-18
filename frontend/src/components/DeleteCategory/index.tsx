import { useState } from "react"

import DeleteDialogComponent from "../DeleteDialog"

import { categoryService } from "../../services/categoryService"
import { DialogCategoryProps } from "../CategoryContainer"
import { toast } from "react-toastify"

interface IDeleteCategoryProps {
    deleteCategory: DialogCategoryProps,
    setDeleteCategory: (state: DialogCategoryProps) => void,
    getCategories(): void
}

export default function DeleteCategory({ deleteCategory, setDeleteCategory, getCategories }: IDeleteCategoryProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleCloseDialog = () => setDeleteCategory({
        openDialog: false,
        category: undefined
    })

    const handleDeletUser = () => {

        setLoading(true)

        categoryService.deleteCategory(deleteCategory.category?.id ?? 0).then(() => {
            toast.success(`${deleteCategory.category?.name} deletado com sucesso.`)
            getCategories()
            handleCloseDialog()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        deleteCategory.openDialog &&
        <DeleteDialogComponent handleCloseDialog={handleCloseDialog} handleDelete={handleDeletUser} loading={loading} title={deleteCategory.category?.name} />
    )
}