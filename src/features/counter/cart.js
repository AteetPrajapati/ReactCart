import { createSlice } from '@reduxjs/toolkit'

export const cartSotre = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cartItem')) ?? [],
    },
    reducers: {
        incrementByAmount: (state, action) => {
            state.items = [...state.items, action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = cartSotre.actions

export default cartSotre.reducer