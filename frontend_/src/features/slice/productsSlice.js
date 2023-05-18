import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    productDetail: {},
    loading: false
}

export const productFetch = createAsyncThunk("products/producstFetch",
    async () => {
        const data = await axios.get("https://mern-shopping-cart-lx1s.onrender.com/api/products");
        return data.data
    }
) 

export const productDetailFetch = createAsyncThunk("products/productDetailFetch",
    async (id) => {
        const data = await axios.get(`https://mern-shopping-cart-lx1s.onrender.com/api/products/${id}`);
        return data.data
    }
) 

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        removeProductDetail: (state) => {
            state.productDetail = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(productFetch.pending, (state) => {
            state.loading = true
        })
        .addCase(productFetch.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
        })
        .addCase(productFetch.rejected, (state) => {
            state.loading = false
        })
        .addCase(productDetailFetch.pending, (state) => {
            state.loading = true
        })
        .addCase(productDetailFetch.fulfilled, (state, action) => {
            state.loading = false
            state.productDetail = action.payload
        })
        .addCase(productDetailFetch.rejected, (state) => {
            state.loading = false
        })
    }
})

export default productSlice.reducer
export const getAllProducts = (state) => state.products.items
export const getProductDetail = (state) => state.products.productDetail
export const getLoading = (state) => state.products.loading
export const { removeProductDetail } = productSlice.actions