import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTrainings = createAsyncThunk(
    'training/all',
    async ({ show500Modal }, { dispatch, rejectWithValue}) => {
        try {
            const response = await axiosPrivate.get(TRAINING_URL);
            return response.data;
        } catch (e) {
            show500Modal();
            return rejectWithValue(e.response.data)
        }
    }
);