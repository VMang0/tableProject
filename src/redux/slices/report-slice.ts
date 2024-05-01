import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { ReportType } from '@redux/types';
import { ReportSliceType } from '@redux/types/types';
import { addReports, getReport, getReports, updateReport } from '@redux/actions/report';

const initialState: ReportSliceType = {
    isLoading: false,
    error: false,
    reports: null,
    report: null as ReportType
};

const reportSlice = createSlice<ReportSliceType, SliceCaseReducers<ReportSliceType>>({
    name: 'report',
    initialState,
    reducers: {
        setReport: (state,  action: PayloadAction<ReportType>) => {
            state.report = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload;
            })
            .addCase(getReports.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReports.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = [...state.reports, action.payload];
            })
            .addCase(addReports.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReports.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.report = action.payload;
            })
            .addCase(getReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReport.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = state.reports?.map((item: ReportType) => (
                    item.f_pers_young_spec_id === action.payload.f_pers_young_spec_id ? action.payload : item
                ));
                state.report = action.payload;
            })
            .addCase(updateReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReport.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const reportsSelector = (state)  => state.report.reports;
export const reportSelector = (state)  => state.report.report;
export const isLoadingReportsSelector = (state)  => state.report.isLoading;
export const { setReport } = reportSlice.actions;
export default reportSlice.reducer;
