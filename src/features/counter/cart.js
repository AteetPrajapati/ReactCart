import { createSlice } from '@reduxjs/toolkit'

export const cartSotre = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cartItem')) ?? [],
    },
    reducers: {
        incrementByAmount: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.items = [...state.items, action.payload];
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, deleteItem } = cartSotre.actions

export default cartSotre.reducer