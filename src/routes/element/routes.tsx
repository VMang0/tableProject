import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Reports } from '@pages/reports';
import { ReportInfo } from '@pages/report-info';
import { ReportInfoEdit } from '@pages/report-info-edit';
import { ReportInfoRead } from '@pages/report-info-read';
import { Login } from '@pages/login';
import { PATH } from '@utils/constants';

import { UnauthenticatedRoute } from '../unauthenticated';
import { AuthenticatedRoute } from '../authenticated';
import { MainContent } from '../main-content';


export const Routes_: FC = () => (
    <Routes>
        <Route exact path='/' element={<Navigate to={PATH.REPORTS} replace />}/>
        <Route element={<MainContent />}>
            <Route element={<AuthenticatedRoute />}>
                <Route path={PATH.REPORTS} element={ <Reports /> } />
                <Route path={PATH.REPORTS_INFO_READ} element={<ReportInfo child={() => <ReportInfoRead />} />} />
                <Route path={PATH.REPORTS_INFO_EDIT} element={<ReportInfo child={() => <ReportInfoEdit />} />} />
            </Route>

            <Route element={<UnauthenticatedRoute />}>
                <Route path={PATH.LOGIN} element={<Login />} />
            </Route>
        </Route>
    </Routes>
);