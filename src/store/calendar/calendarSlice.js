import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

export const templateSlice = createSlice({
    name: 'template',
    initialState: {
        counter: 10
    },
    reducers: {
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount, decrement } = templateSlice.actions;