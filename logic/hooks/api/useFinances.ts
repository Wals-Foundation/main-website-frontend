/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/logic/config/base"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Finance, Slugs } from "@/utils/types"
import axios from "axios"

type InitialState = {
  loading: boolean
  finances: Finance[]
  aboutOrganization: { organisation_story?: string; organisation_mission?: string; organisation_vision?: string }
  communityCausesData: any[]
  programsCausesData: any[]
  projectCausesData: any[]
  pageHeadlines: { page: string; headline: string; subheadline: string }[]
  pageControl: { key: Slugs; isLive: boolean }[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  finances: [],
  pageControl: [],
  pageHeadlines: [],
  aboutOrganization: {},
  communityCausesData: [],
  programsCausesData: [],
  projectCausesData: [],
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

export const getCommunitiesData = createAsyncThunk("usePageHeadlines/getCommunitiesData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`communities?pagination[pageSize]=1000&populate=*`)
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

export const getProgamsData = createAsyncThunk("usePageHeadlines/getProgamsData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`programs?pagination[pageSize]=1000&populate=*`)
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

export const getProjectsData = createAsyncThunk("usePageHeadlines/getProjectsData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`projects?pagination[pageSize]=1000&populate=*`)
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

const useFinance = createSlice({
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

    builder.addCase(getCommunitiesData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCommunitiesData.fulfilled, (state, action) => {
      state.loading = false
      state.communityCausesData = action.payload
    })
    builder.addCase(getCommunitiesData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getProjectsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProjectsData.fulfilled, (state, action) => {
      state.loading = false
      state.projectCausesData = action.payload
    })
    builder.addCase(getProjectsData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getProgamsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProgamsData.fulfilled, (state, action) => {
      state.loading = false
      state.programsCausesData = action.payload
    })
    builder.addCase(getProgamsData.rejected, (state, action) => {
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

export default useFinance.reducer
