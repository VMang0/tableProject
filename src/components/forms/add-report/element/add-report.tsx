import { FC } from 'react';
import { Box, Button, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addReports } from '@redux/actions/report';
import CloseIcon from '@mui/icons-material/Close';
import { AppDispatch } from '@redux/store';
import { useAlert } from '@hooks/alerts';
import { useAuthState } from '@hooks/auth';
import { DateInput } from '@components/inputs';
import { date, object, ref, string } from 'yup';

import '../ui/add-report.scss';

type ReportData = {
    insert_user: string;
    org_employee: string;
    rep_beg_period: string;
    rep_end_period: string;
    update_user: string;
}

type AddReportProps = {
    onCloseForm: () => void;
}

export const AddReport: FC<AddReportProps> = ({ onCloseForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentYear = new Date().getFullYear();
    const { isAuthenticated } = useAuthState();
    const { showAlert } = useAlert();

    const initialValues = {
        startDate: '',
        endDate: '',
        insertUser: ''
    };

    const validationSchema = object().shape({
        startDate: date().required('Дата начала периода должна быть заполнена')
            .min(`${currentYear - 1}-01-01`, 'Дата начала периода должна быть после 1 января прошлого года')
            .max(`${currentYear}-12-31`, 'Дата начала периода должна быть до 31 декабря текущего года'),
        endDate: date().required('Дата окончания периода должна быть заполнена')
            .min(ref('startDate'), 'Дата окончания периода должна быть позже начала периода')
            .max(`${currentYear}-12-31`, 'Дата окончания периода должна быть до 31 декабря текущего года'),
        insertUser: string().required('Контактные данные должны быть заполнены')
    });

    const onSubmit = async ({ insertUser, startDate, endDate }: typeof initialValues) => {
        const reportData: ReportData = {
            insert_user: isAuthenticated,
            org_employee: insertUser,
            rep_beg_period: startDate,
            rep_end_period: endDate,
            update_user: isAuthenticated
        };
        try {
            await dispatch(addReports({ reportData })).unwrap();
            onCloseForm();
            showAlert('Запись успешно добавлена', 'success');
        } catch (e) {
            showAlert('Произошла ошибка при добавлении данных', 'error');
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const { values, touched, handleChange, errors, handleSubmit, handleBlur } = formik;

    return (
        <Box className='form_container'>
            <Box className='form_wrapper'>
                <FormControl component='form' onSubmit={handleSubmit}>
                    <Box className='form_header'>
                        <Typography className='form_title' variant='h6' gutterBottom>
                            Добавить запись
                        </Typography>
                        <IconButton onClick={onCloseForm}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid container spacing={2} className='form_input'>
                        <Grid item xs={12} sm={6}>
                            <DateInput
                                label='Начало периода'
                                name='startDate'
                                fullWidth
                                value={values.startDate}
                                onChange={handleChange}
                                error={touched.startDate && Boolean(errors.startDate)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DateInput
                                label='Конец периода'
                                name='endDate'
                                fullWidth
                                value={values.endDate}
                                onChange={handleChange}
                                error={touched.endDate && Boolean(errors.endDate)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                className='form-input'
                                label='ФИО и контактные данные сотрудника'
                                name='insertUser'
                                value={values.insertUser}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.insertUser && Boolean(errors.insertUser)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body2' className='error-text'>
                                {
                                    (touched.startDate && errors.startDate) ||
                                    (touched.endDate && errors.endDate) ||
                                    (touched.insertUser && errors.insertUser)
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        fullWidth>
                        Добавить
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};
