import { useSelector } from 'react-redux';
import { reportSelector } from '@redux/slices/report-slice';
import { reportInfoSelector } from '@redux/slices/report-info-slice';
import { ReportInfoTable } from '@components/report-info-table';
import { ReadInput } from '@components/inputs';
import { Box, Grid, Typography } from '@mui/material';

export const ReportInfoRead = () => {
    const report = useSelector(reportSelector);
    const reportsInfo = useSelector(reportInfoSelector);

    return (
        <Box className='reports_container'>
            <Grid
                container
                alignItems='center'
                justifyContent='flex-start'
                direction='row'
                sx={{ gap: '10px' }}>
                <ReadInput
                    size='small'
                    label='Начало периода'
                    name='startDate'
                    value={report ? report.rep_beg_period : ''} />
                <ReadInput
                    size='small'
                    label='Конец периода'
                    name='endDate'
                    value={report ? report.rep_end_period : ''} />
                <ReadInput
                    size='small'
                    label='ФИО и контактные данные сотрудника'
                    name='org_employee'
                    value={report ? report.org_employee : ''} />
            </Grid>
            {!reportsInfo || reportsInfo.length === 0
                ? <Typography variant='h6'>Кажется, ничего не найдено.</Typography>
                : <ReportInfoTable isEditable={false} />}
        </Box>
    );
};