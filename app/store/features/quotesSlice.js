import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quotes: [], // Menggunakan quotes (jamak)
    isLoading: true,
};

export const quotesSlice = createSlice({
    name: 'quotes', // Nama slice adalah quotes (jamak)
    initialState,
    reducers: {
        setQuotes: (state, action) => {
            state.quotes = action.payload; // Mengakses quotes (jamak)
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setQuotes, setLoading } = quotesSlice.actions;

export default quotesSlice.reducer;