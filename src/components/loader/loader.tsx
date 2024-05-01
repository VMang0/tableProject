import { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

type LoaderPropsType = {
    open: boolean
}

export const Loader: FC<LoaderPropsType> = ({ open }) => (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}>
        <CircularProgress color='inherit' />
    </Backdrop>
);