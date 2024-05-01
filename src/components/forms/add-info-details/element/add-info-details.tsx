import { FC, useMemo } from 'react';
import {
    TextField,
    MenuItem,
    FormControl,
    Select,
    Button,
    Grid,
    Box,
    IconButton,
    Typography,
    InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { reportInfoSelector, reportTypesSelector } from '@redux/slices/report-info-slice';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { useAuthState } from '@hooks/auth';
import { AppDispatch } from '@redux/store';
import { addReportInfo } from '@redux/actions/report-info';
import { useParams } from 'react-router-dom';
import { useAlert } from '@hooks/alerts';

type AddInfoDetailsPropsType = {
    closeForm: () => void
}

type InfoDataType = {
    target_count: number,
    distribution_count: number,
    update_user: string,
    nsi_pers_indicate_id: number,
    f_pers_young_spec_id: number
}

export const AddInfoDetails: FC<AddInfoDetailsPropsType> = ({ closeForm }) => {
    const reportTypesInfo = useSelector(reportTypesSelector);
    const { isAuthenticated } = useAuthState();
    const { reportId } = useParams<{ reportId: string }>();
    const { showAlert } = useAlert();
    const dispatch = useDispatch<AppDispatch>();
    const reportsInfo = useSelector(reportInfoSelector);
    const filteredReportTypesInfo = useMemo(() => {
        return reportTypesInfo.filter(item => !reportsInfo
            .some(report => report.nsi_pers_indicate_id === item.nsi_pers_young_spec_id))
    }, [reportsInfo, reportTypesInfo]);

    const validationSchema = object().shape({
        typeId: string().required(),
        targetCount: number().integer().required('Значение для целевого обязательно'),
        distributionCount: number().integer().required('Значение для распределения обязательно'),
    });

    const onSubmit = async ({ targetCount, distributionCount, typeId }: InfoDataType) => {
        const infoData = {
            target_count: targetCount,
            distribution_count: distributionCount,
            update_user: isAuthenticated,
            nsi_pers_indicate_id: typeId,
            f_pers_young_spec_id: reportId
        };
        try {
            await dispatch(addReportInfo({ infoData })).unwrap();
            closeForm();
            showAlert('Запись успешно добавлена', 'success');
        } catch (e) {
            showAlert('При добавлении записи произошла ошибка', 'error');
        }
    };

    const formik = useFormik({
        initialValues: {
            typeId: '',
            targetCount: 0,
            distributionCount: 0,
        },
        validationSchema,
        onSubmit,
    });

    const { values, touched, handleChange, errors, handleSubmit } = formik;

    return (
        <Box className='form_container'>
            <Box className='form_wrapper'>
                <FormControl component='form' onSubmit={handleSubmit}>
                    <Box className='form_header'>
                        <Typography className='form_title' variant="h6" gutterBottom>
                            Добавить запись
                        </Typography>
                        <IconButton onClick={closeForm}>
                            <CloseIcon  />
                        </IconButton>
                    </Box>
                    <Grid container spacing={2} className='form_input'>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id='targetCount'
                                name='targetCount'
                                type='number'
                                step={1}
                                label='Целевое'
                                variant='outlined'
                                value={values.targetCount}
                                onChange={handleChange}
                                error={touched.targetCount && Boolean(errors.targetCount)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id='distributionCount'
                                name='distributionCount'
                                type='number'
                                step={1}
                                label='По распределение'
                                variant="outlined"
                                value={values.distributionCount}
                                onChange={handleChange}
                                error={touched.distributionCount && Boolean(errors.distributionCount)} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='typeId-label'>Запись из справочника</InputLabel>
                                <Select
                                    id='typeId'
                                    name='typeId'
                                    labelId='typeId-label'
                                    fullWidth
                                    value={values.typeId}
                                    onChange={handleChange}
                                    className='form_select'
                                    error={touched.typeId && Boolean(errors.typeId)}>
                                    {filteredReportTypesInfo.length ? (
                                        filteredReportTypesInfo.map(item => (
                                            <MenuItem
                                                value={item.nsi_pers_young_spec_id}
                                                key={item.nsi_pers_young_spec_id} >
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="" disabled>
                                            Нет доступных записей из справочника
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
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
                        size='large'
                        color='primary'
                        fullWidth>
                        Добавить
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};
