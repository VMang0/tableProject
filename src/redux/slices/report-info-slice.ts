import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { ReportInfoSliceType, ReportInfoType } from '@redux/types/types';
import { addReportInfo, getReportInfo, getReportInfoTypes, updateReportInfo } from '@redux/actions/report-info';

const initialState: ReportInfoSliceType = {
    isLoading: false,
    error: false,
    reportInfo: null,
    reportTypes: null as Array<ReportInfoType>
};

const reportInfoSlice = createSlice<ReportInfoSliceType, SliceCaseReducers<ReportInfoSliceType>>({
    name: 'reportInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getReportInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reportInfo = action.payload;
            })
            .addCase(getReportInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReportInfo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getReportInfoTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reportTypes = action.payload;
            })
            .addCase(getReportInfoTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReportInfoTypes.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addReportInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reportInfo = [...state.reportInfo, action.payload];
            })
            .addCase(addReportInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReportInfo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateReportInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reportInfo = state.reportInfo?.map(item =>
                    item.f_pers_young_spec_line_id === action.payload.f_pers_young_spec_line_id
                        ? action.payload : item);
            })
            .addCase(updateReportInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReportInfo.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const reportInfoSelector = (state)  => state.reportInfo.reportInfo;
export const reportTypesSelector = (state)  => state.reportInfo.reportTypes;
export const isLoadingReportInfoSelector = (state)  => state.reportInfo.isLoading;
export default reportInfoSlice.reducer;
