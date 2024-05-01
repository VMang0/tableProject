import { createAsyncThunk } from '@reduxjs/toolkit';
import { base_axios } from '@utils/axios';
import { Urls } from '@utils/constants';

export const getReportInfo = createAsyncThunk(
    'reportInfo/all',
    async ({ reportId }, { rejectWithValue}) => {
        try {
            const response = await base_axios.get(Urls.REPORT_INFO);
            return response.data.filter(item => item.f_pers_young_spec_id == reportId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const getReportInfoTypes = createAsyncThunk(
    'reportInfo/type',
    async (_, { rejectWithValue}) => {
        try {
            const response = await base_axios.get(Urls.REPORT_INFO_TYPES);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const addReportInfo = createAsyncThunk(
    'reportInfo/add',
    async ({ infoData }, { rejectWithValue}) => {
        try {
            const response = await base_axios.post(Urls.REPORT_INFO, infoData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const updateReportInfo = createAsyncThunk(
    'reportInfo/update',
    async ({ infoData, id }, { rejectWithValue}) => {
        try {
            const response = await base_axios.patch(`${Urls.REPORT_INFO}${id}/`, infoData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);