import { useEffect, useState } from 'react';
import { updateReport } from '@redux/actions/report';
import { useDispatch, useSelector } from 'react-redux';
import { reportSelector } from '@redux/slices/report-slice';
import { AppDispatch } from '@redux/store';
import { DateInput } from '@components/inputs';
import { useAuthState } from '@hooks/auth';
import { useAlert } from '@hooks/alerts';
import { useFormik } from 'formik';
import { date, object, ref, string } from 'yup';
import { Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material';

export const UpdateReport = () => {
    const dispatch = useDispatch<AppDispatch>();
    const report = useSelector(reportSelector);
    const currentYear = new Date().getFullYear();
    const { isAuthenticated } = useAuthState();
    const { showAlert } = useAlert();
    const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

    const validationSchema = object().shape({
        startDate: date().required()
            .min(`${currentYear - 1}-01-01`, 'Дата начала периода должна быть после 1 января прошлого года')
            .max(`${currentYear}-12-31`, 'Дата начала периода должна быть до 31 декабря текущего года'),
        endDate: date().required()
            .min(ref('startDate'), 'Дата окончания периода должна быть позже начала периода')
            .max(`${currentYear}-12-31`, 'Дата окончания периода должна быть до 31 декабря текущего года'),
        employee: string().required()
    });

    const onSubmit = async ({ employee, startDate, endDate }) => {
        const reportData = {
            org_employee: employee,
            rep_beg_period: startDate,
            rep_end_period: endDate,
            update_user: isAuthenticated
        };
        try {
            await dispatch(updateReport({ id: report.f_pers_young_spec_id, ...reportData })).unwrap();
            showAlert('Запись успешно изменена', 'success');
        } catch (e) {
            showAlert('Произошла ошибка при изменении данных', 'error');
        }
    };

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
            employee: '',
        },
        validationSchema,
        onSubmit,
    });

    const { values, touched, handleChange, errors, handleSubmit, setValues } = formik;

    useEffect(() => {
        if (report) {
            setValues({
                startDate: report.rep_beg_period,
                endDate: report.rep_end_period,
                employee: report.org_employee,
            });
        }
    }, [report]);

    useEffect(() => {
        const isStartDateChanged = values.startDate !== report?.rep_beg_period;
        const isEndDateChanged = values.endDate !== report?.rep_end_period;
        const isInsertUserChanged = values.employee !== report?.org_employee;
        setIsFormChanged(isStartDateChanged || isEndDateChanged || isInsertUserChanged);
    }, [report, values]);

    return (
        <FormControl component='form' onSubmit={handleSubmit} fullWidth>
            <Grid container
                  alignItems='center'
                  justifyContent='flex-start'
                  direction='row'
                  sx={{ gap: '10px' }}>
                <DateInput
                    size='small'
                    label='Начало периода'
                    name='startDate'
                    value={values.startDate}
                    onChange={handleChange}
                    error={touched.startDate && Boolean(errors.startDate)} />
                <DateInput
                    size='small'
                    label='Конец периода'
                    name='endDate'
                    value={values.endDate}
                    onChange={handleChange}
                    error={touched.endDate && Boolean(errors.endDate)} />
                <TextField
                    size='small'
                    label='ФИО и контактные данные сотрудника'
                    name='employee'
                    onChange={handleChange}
                    value={values.employee}
                    error={touched.employee && Boolean(errors.employee)}
                    sx={{ flexGrow: 1 }} />
                {isFormChanged && (
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'>
                        Сохранить
                    </Button>
                )}
            </Grid>
            {(errors.endDate || errors.startDate) && (
                <Grid item xs={10}>
                    <FormHelperText error>
                        {errors.endDate}
                        {errors.startDate}
                    </FormHelperText>
                </Grid>
            )}
        </FormControl>
    );
};