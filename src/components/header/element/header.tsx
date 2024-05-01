import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAuthState } from '@hooks/auth';
import { PATH } from '@utils/constants';

export const AppHeader = () => {
    const { logout } = useAuthState<() => void>();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(PATH.LOGIN)
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link
                        to={PATH.REPORTS}
                        sx={{ display: 'block', color: 'unset', flexGrow: 1 }}>
                        DCMENTE
                    </Link>
                </Typography>
                <Button color="inherit" onClick={handleLogout}>выйти</Button>
            </Toolbar>
        </AppBar>
    );
};