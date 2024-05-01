import { useSelector } from 'react-redux';
import { isLoadingReportsSelector } from '@redux/slices/report-slice';
import { isLoadingReportInfoSelector } from '@redux/slices/report-info-slice';

export const useLoadingState = () => {
    const isLoadingReports = useSelector(isLoadingReportsSelector);
    const isLoadingReportInfo = useSelector(isLoadingReportInfoSelector);
    const isLoading = isLoadingReports || isLoadingReportInfo;
    return {
        isLoading
    };
};