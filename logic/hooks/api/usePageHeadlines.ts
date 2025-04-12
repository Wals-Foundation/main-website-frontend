import axiosInstance from "@logic/config/base"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Finance, Slugs } from "@utils/types"
import axios from "axios"

type InitialState = {
  loading: boolean
  pageHeadlines: { page: string; headline: string; subheadline: string }[]
  pageControl: { key: Slugs; isLive: boolean }[]
  finances: Finance[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  pageHeadlines: [],
  pageControl: [],
  finances: [],
  error: "",
}

export const getPageHeadlinesData = createAsyncThunk("usePageHeadlines/getPageHeadlinesData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`pages?pagination[pageSize]=1000`)
    if (response.data) {
      return response.data?.data
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    let statusCode: number | undefined

    // Safely handling Axios errors
    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status // Safely access status
      errorMessage = JSON.stringify(error.response?.data) || error.message || "An error occurred while"
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    console.error(`Error: ${errorMessage}, Status: ${statusCode || "Unknown"}`)
    return rejectWithValue({ message: errorMessage, status: statusCode })
  }
})

export const getPageControlData = createAsyncThunk("usePageHeadlines/getPageControlData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`feature-flags?pagination[pageSize]=1000`)
    if (response.data) {
      return response.data?.data
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    let statusCode: number | undefined

    // Safely handling Axios errors
    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status // Safely access status
      errorMessage = JSON.stringify(error.response?.data) || error.message || "An error occurred while"
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    console.error(`Error: ${errorMessage}, Status: ${statusCode || "Unknown"}`)
    return rejectWithValue({ message: errorMessage, status: statusCode })
  }
})

export const getTransactionsData = createAsyncThunk("usePageHeadlines/getTransactionsData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`google-sheet?pagination[pageSize]=1000`)
    if (response.data) {
      return response.data
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    let statusCode: number | undefined

    // Safely handling Axios errors
    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status // Safely access status
      errorMessage = JSON.stringify(error.response?.data) || error.message || "An error occurred while"
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    console.error(`Error: ${errorMessage}, Status: ${statusCode || "Unknown"}`)
    return rejectWithValue({ message: errorMessage, status: statusCode })
  }
})

const usePageHeadlinesSlice = createSlice({
  name: "usePageHeadlines",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPageHeadlinesData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getPageHeadlinesData.fulfilled, (state, action) => {
      state.loading = false
      state.pageHeadlines = action.payload
    })
    builder.addCase(getPageHeadlinesData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getPageControlData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getPageControlData.fulfilled, (state, action) => {
      state.loading = false
      state.pageControl = action.payload
    })
    builder.addCase(getPageControlData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getTransactionsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getTransactionsData.fulfilled, (state, action) => {
      state.loading = false
      state.finances = action.payload
    })
    builder.addCase(getTransactionsData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })
  },
})

export default usePageHeadlinesSlice.reducer
