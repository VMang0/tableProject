import { FC } from 'react';
import { Outlet, Navigate  } from 'react-router-dom';
import { useAuthState } from '@hooks/auth';
import { PATH } from '@utils/constants';

export const UnauthenticatedRoute: FC = () => {
    const { isAuthenticated } = useAuthState();
    return !isAuthenticated
        ? <Outlet />
        : <Navigate to={PATH.REPORTS} replace />;
};