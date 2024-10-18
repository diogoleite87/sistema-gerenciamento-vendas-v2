import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IDeleteDialogComponentProps {
    title?: string,
    handleCloseDialog: () => void,
    handleDelete: () => void,
    loading: boolean
}

export default function DeleteDialogComponent({ title, handleCloseDialog, loading, handleDelete }: IDeleteDialogComponentProps) {
    return (
        <Dialog
            open
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Deseja deletar ${title}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {'Essa operação não poderá ser desfeita.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} >Recusar</Button>
                <LoadingButton loading={loading} onClick={handleDelete} autoFocus >
                    Aceitar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}