import { combineReducers, configureStore } from '@reduxjs/toolkit';
import report from '@redux/slices/report-slice';
import reportInfo from '@redux/slices/report-info-slice';

const rootReducer = combineReducers({
    report,
    reportInfo
});

export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;