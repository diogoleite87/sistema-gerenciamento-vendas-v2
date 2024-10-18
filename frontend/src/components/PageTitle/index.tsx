import Typography from '@mui/material/Typography';

import { Box } from '@mui/material';

interface IPageTitleProps {
    text: string
}

export default function PageTitle({ text }: IPageTitleProps) {
    return (
        <Box>
            <Typography
                component="h1"
                variant="h6"
                fontWeight={700}
                fontSize={30}
            >
                {text}
            </Typography>
            <Box height={5} width='100%' bgcolor={(theme) => theme.palette.primary.main} borderRadius={1} />
        </Box>
    );
};