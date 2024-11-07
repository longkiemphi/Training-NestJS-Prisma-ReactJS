import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    form: {
        step: 1,
        formData: {
            name: '',
            type: '',
            storage: '',
            ram: '',
            conditon: '',
            ownerName: '',
            ownerEmail: '',
            ownerPhone: '',
        },
    },
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        nextStep: (state) => {
            console.log(state.form.step);
            state.form.step += 1;
        },
        prevStep: (state) => {
            state.form.step -= 1;
        },
        setFormData: (state, action) => {
            state.form.formData = {
                ...state.form.formData,
                ...action.payload,
            };
        },
    },
});

export const { nextStep, prevStep, setFormData } = customerSlice.actions;
export default customerSlice.reducer;
