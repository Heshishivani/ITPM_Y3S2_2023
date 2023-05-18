import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    
}

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            )
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct)
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action) => {
            const nextCartItem = state.cartItems.filter(
                (item) => item._id !== action.payload._id
            )
            state.cartItems = nextCartItem
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItem = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                )
                state.cartItems = nextCartItem
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getTotals: (state, action) => {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price, cartQuantity} = cartItem
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                return cartTotal
            }, {
                total: 0,
                quantity: 0
            })
            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
        }
    }
})

export default cartSlice.reducer
export const getCartItems = (state) => state.carts.cartItems
export const getCartTotalQuantity = (state) => state.carts.cartTotalQuantity
export const getCartTotalAmount = (state) => state.carts.cartTotalAmount
export const { addToCart, removeFromCart, decreaseCart, getTotals } = cartSlice.actions
