import { createAsyncThunk } from '@reduxjs/toolkit';
import { base_axios } from '@utils/axios';
import { Urls } from '@utils/constants';

export const getReports = createAsyncThunk(
    'report/all',
    async (_, { rejectWithValue}) => {
        try {
            const response = await base_axios.get(Urls.REPORT);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const addReports = createAsyncThunk(
    'report/add',
    async ({ reportData }, { rejectWithValue}) => {
        try {
            const response = await base_axios.post(Urls.REPORT, reportData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const getReport = createAsyncThunk(
    'report/one',
    async ({ reportId }, { rejectWithValue}) => {
        try {
            const response = await base_axios.get(`${Urls.REPORT}${reportId}/`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const updateReport = createAsyncThunk(
    'report/update',
    async ({ id, ...report }, { rejectWithValue}) => {
        try {
            const response = await base_axios.patch(`${Urls.REPORT}${id}/`, report);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);