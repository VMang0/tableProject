import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { getReports } from '@redux/actions/report';
import { reportsSelector } from '@redux/slices/report-slice';
import { ReportsTable } from '@components/reports-table';
import { AddReport } from '@components/forms';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAlert } from '@hooks/alerts/alerts';

import '../ui/reports.css';

export const Reports = () => {
    const dispatch = useDispatch<AppDispatch>();
    const reports = useSelector(reportsSelector);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const handleFormState= () => setIsOpenForm(state => !state);
    const handleGetReports = async () => {
        try {
            await dispatch(getReports()).unwrap();
        } catch (e) {
            showAlert('Произошла ошибка при получении данных', 'error');
        }
    }

    useEffect(() => {
        if (!reports) handleGetReports()
    }, [])

    return (
        <Box className='reports_container'>
            <Button
                variant='contained'
                color='secondary'
                startIcon={<AddIcon />}
                onClick={handleFormState}>
                Добавить запись
            </Button>
            { !reports || reports.length === 0
                ? <Typography variant='h6'>Кажется, ничего не найдено. Попробуйте создать новую запись.</Typography>
                : <ReportsTable /> }
            { isOpenForm && <AddReport onCloseForm={handleFormState} /> }
        </Box>
    );
};