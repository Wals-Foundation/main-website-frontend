import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PageUiState } from "./ui/page-ui-state";
import { getMainMenuItems } from "@/menu/data/menu-repository";
import { StrapiError } from "@/core/data/strapi-error";

// Responsibilities: parsing url arguments, managing state and handling UI logic

const initialState: PageUiState = {
    loading: false,
    header: {
        menuItems: [],
        menuOpened: false,
        showDonateBtn: false
    }
}

export const initialisePageUiState = createAsyncThunk("initialisePage", async (_, { rejectWithValue }) => {
    try {
        return await getMainMenuItems()
    } catch (error) {
        return rejectWithValue(StrapiError.Unknown)
    }
})

const usePage = createSlice({
    name: "usePage",
    initialState,
    reducers: {},

})

export default usePage.reducer