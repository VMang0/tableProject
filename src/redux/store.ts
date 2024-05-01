import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    router: routerReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;