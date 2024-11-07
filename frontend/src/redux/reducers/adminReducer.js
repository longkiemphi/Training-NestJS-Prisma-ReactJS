import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = [...action.payload];
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id == action.payload.id);
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...action.payload };


            }
            state.products = [...state.products];
        },
    },
});

export const { setProducts, updateProduct } = adminSlice.actions;
export default adminSlice.reducer;
