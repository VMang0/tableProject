import { useState } from 'react';
import { useSelector } from 'react-redux';
import { reportInfoSelector } from '@redux/slices/report-info-slice';
import { ReportInfoTable } from '@components/report-info-table';
import { AddInfoDetails, UpdateReport } from '@components/forms';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const ReportInfoEdit = () => {
    const [isOpenForm, setIsFormOpen] = useState(false);
    const reportsInfo = useSelector(reportInfoSelector);

    return (
        <Box className='reports_container'>
            <UpdateReport />
            <Button
                variant='contained'
                color='secondary'
                startIcon={<AddIcon />}
                onClick={() => setIsFormOpen(true)}>
                Добавить запись
            </Button>
            {!reportsInfo || reportsInfo.length === 0
                ? <Typography variant='h6'>Кажется, ничего не найдено. Попробуйте создать новую запись.</Typography>
                : <ReportInfoTable isEditable={true} />}
            { isOpenForm && <AddInfoDetails closeForm={() => setIsFormOpen(false)} /> }
        </Box>
    );
};
