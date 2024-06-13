// app/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import quotesSlice from './features/quotesSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        quotes: quotesSlice,
    },
});