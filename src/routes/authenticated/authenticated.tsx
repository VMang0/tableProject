import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from '@hooks/auth';
import { PATH } from '@utils/constants';

export const AuthenticatedRoute: FC = () => {
    const { isAuthenticated } = useAuthState();
    return isAuthenticated
        ? <Outlet />
        : <Navigate to={PATH.LOGIN} replace />;
};