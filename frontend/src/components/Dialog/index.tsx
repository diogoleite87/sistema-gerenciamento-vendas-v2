import { Dialog, DialogTitle, Divider, Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ReactNode } from "react";


interface IDialogProps {
    children: ReactNode,
    title: string,
    handleCloseDialog: () => void,
    maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs',
    fullWidth?: boolean
}

export default function DialogComponent({ handleCloseDialog, children, title, maxWidth, fullWidth }: IDialogProps) {
    return (
        <Dialog
            TransitionProps={{ unmountOnExit: true }}
            open
            scroll="body"
            maxWidth={maxWidth ?? 'md'}
            fullWidth={fullWidth}
        >
            <DialogTitle>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>{title}</Grid>
                    <Grid item>
                        <IconButton sx={{ size: 'small' }} onClick={handleCloseDialog}>
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider />

            {children}

        </Dialog >
    )
}