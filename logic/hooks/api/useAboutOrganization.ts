/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/logic/config/base"
import { AboutOrganization, AboutOrganizationApproach, AboutOrganizationValues } from "@/utils/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

type InitialState = {
  loading: boolean
  aboutOrganization: AboutOrganization
  ourValues: AboutOrganizationValues[]
  ourApproach: AboutOrganizationApproach[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  aboutOrganization: {},
  ourApproach: [],
  ourValues: [],
  error: "",
}

export const getAboutOrganizationData = createAsyncThunk(
  "usePageHeadlines/getAboutOrganizationData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/about-organisation?pagination[pageSize]=1000&populate=*`)
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
  }
)

export const getAboutOrganizationValues = createAsyncThunk(
  "usePageHeadlines/getAboutOrganizationValues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/organisation-values?pagination[pageSize]=1000&populate=*`)
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
  }
)

export const getAboutOrganizationApproach = createAsyncThunk(
  "usePageHeadlines/getAboutOrganizationApproach",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/organisation-approaches?pagination[pageSize]=1000&populate=*`)
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
  }
)

const useAboutOrganiztion = createSlice({
  name: "usePageHeadlines",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAboutOrganizationData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAboutOrganizationData.fulfilled, (state, action) => {
      state.loading = false
      state.aboutOrganization = action.payload
    })
    builder.addCase(getAboutOrganizationData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getAboutOrganizationValues.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAboutOrganizationValues.fulfilled, (state, action) => {
      state.loading = false
      state.ourValues = action.payload
    })
    builder.addCase(getAboutOrganizationValues.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getAboutOrganizationApproach.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAboutOrganizationApproach.fulfilled, (state, action) => {
      state.loading = false
      state.ourApproach = action.payload
    })
    builder.addCase(getAboutOrganizationApproach.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })
  },
})

export default useAboutOrganiztion.reducer
