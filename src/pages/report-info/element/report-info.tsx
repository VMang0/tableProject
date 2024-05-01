import { FC, JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { reportSelector } from '@redux/slices/report-slice';
import { reportTypesSelector } from '@redux/slices/report-info-slice';
import { getReport } from '@redux/actions/report';
import { getReportInfo, getReportInfoTypes } from '@redux/actions/report-info';
import { useAlert } from '@hooks/alerts';

type ReportInfoPropsType = {
    child: () => JSX.Element
}

export const ReportInfo: FC<ReportInfoPropsType> = ({ child }) => {
    const dispatch = useDispatch<AppDispatch>();
    const report = useSelector(reportSelector);
    const reportType = useSelector(reportTypesSelector);
    const { reportId } = useParams();
    const { showAlert } = useAlert();
    const errorMessage = 'Произошла ошибка при загрузке данных';

    const handleGetReport = async () => {
        try {
            await dispatch(getReport({ reportId })).unwrap();
        } catch (e) {
            showAlert(errorMessage, 'error');
        }
    }
    const handleGetReportInfo = async () => {
        try {
            await dispatch(getReportInfo({ reportId })).unwrap();
        } catch (e) {
            showAlert(errorMessage, 'error');
        }
    }
    const handleGetReportType = async () => {
        try {
            await dispatch(getReportInfoTypes()).unwrap();
        } catch (e) {
            showAlert(errorMessage, 'error');
        }
    }

    useEffect(() => {
        if (!report) handleGetReport();
        if (!reportType) handleGetReportType();
        handleGetReportInfo();
    }, []);

    return child();
};