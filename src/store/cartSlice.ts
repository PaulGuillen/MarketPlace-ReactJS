import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../features/model/Product";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart(state, action: PayloadAction<Product>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity < parseInt(existingItem.stock)) {
                    existingItem.quantity += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },


        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        increaseQuantity(state, action: PayloadAction<string>) {
            const existingItem = state.items.find((item) => item.id === action.payload);
            if (existingItem && existingItem.quantity < parseInt(existingItem.stock)) {
                existingItem.quantity += 1;
            }
        },

        decreaseQuantity(state, action: PayloadAction<string>) {
            const existingItem = state.items.find((item) => item.id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },

    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
    cartSlice.actions;
export default cartSlice.reducer;
