import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLoadingState } from '@hooks/loading';
import { AlertProvider } from '@hooks/alerts';
import { Loader } from '@components/loader';
import { AppHeader } from '@components/header';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@utils/theme';
import { PATH } from '@utils/constants';

import '../ui/main-content.scss';

export const MainContent: FC = () => {
    const { isLoading} = useLoadingState();
    const { pathname } = useLocation();

    return (
        <>
            <Loader open={isLoading} />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AlertProvider>
                    <Container
                        width='lg'
                        sx={{ display: 'flex' }}
                        className='content_container'
                        component='main'>
                        { pathname !== PATH.LOGIN && <AppHeader/> }
                        <Box className='content_container_outlet'>
                            <Outlet />
                        </Box>
                    </Container>
                </AlertProvider>
            </ThemeProvider>
        </>
    )
}