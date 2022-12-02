import { configureStore } from '@reduxjs/toolkit'
import cartSotre from "../src/features/counter/cart"

export default configureStore({
    reducer: {
        cartStore: cartSotre
    },
})