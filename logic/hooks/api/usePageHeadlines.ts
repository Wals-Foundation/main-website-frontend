import axiosInstance from "@logic/config/base"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

type InitialState = {
  loading: boolean
  data: object
  error: string
}

const initialState: InitialState = {
  loading: false,
  data: {},
  error: "",
}

export const getPageHeadLinesData = createAsyncThunk("usePageHeadlines/loginUser", async (data: object, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/page-headlines`, data)
    if (response.data) {
      localStorage.setItem("refreshToken", response.data?.refreshToken || "")
      axiosInstance.defaults.headers.common["Authorization"] = response.data?.accessToken
      return response.data
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    let statusCode: number | undefined

    // Safely handling Axios errors
    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status // Safely access status
      errorMessage = JSON.stringify(error.response?.data) || error.message || "An error occurred while sending OTP"
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    console.error(`Error Sending OTP: ${errorMessage}, Status: ${statusCode || "Unknown"}`)
    return rejectWithValue({ message: errorMessage, status: statusCode })
  }
})

const usePageHeadlinesSlice = createSlice({
  name: "usePageHeadlines",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPageHeadLinesData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getPageHeadLinesData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(getPageHeadLinesData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })
  },
})

export default usePageHeadlinesSlice.reducer
