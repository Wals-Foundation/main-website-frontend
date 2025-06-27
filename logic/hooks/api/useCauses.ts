/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/logic/config/base"
import { populateDistrict, populateImage } from "@/utils/queries"
import { Activities, NormalizedCause, RawCauseResponse } from "@/utils/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

type InitialState = {
  loading: boolean
  communityCausesData: RawCauseResponse
  programsCausesData: RawCauseResponse
  projectCausesData: RawCauseResponse
  causesData: NormalizedCause
  activities: Activities[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  communityCausesData: { data: [] },
  programsCausesData: { data: [] },
  projectCausesData: { data: [] },
  activities: [],
  causesData: {},
  error: "",
}

export const getCommunitiesData = createAsyncThunk("useCauses/getCommunitiesData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `communities?pagination[pageSize]=1000&${populateDistrict}&populate[cause]${populateImage}[populate][related][on][api::cause.cause][populate][district]=*`
    )
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

export const getCauseByID = createAsyncThunk(
  "useCauses/getCauseByID",
  async (data: { url: string; id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${data.url}?filters[id][$eq]=${data.id}` +
          `&${populateDistrict}` +
          `&populate[cause][populate][location]=*` +
          `&populate[cause][populate][region]=*` +
          `&populate[cause][populate][gallery][populate][source][populate][related][on][api::cause.cause][populate][district]=*` +
          `&populate[cause]${populateImage}[populate][related][on][api::cause.cause][populate][district]=*` +
          `&populate[donatable][populate][donation][populate][currency]=*`
      )
      if (response.data) {
        return response.data.data[0]
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

export const getProgamsData = createAsyncThunk("useCauses/getProgamsData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `programs?pagination[pageSize]=1000&${populateDistrict}&populate[cause]${populateImage}[populate][related][on][api::cause.cause][populate][district]=*`
    )
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

export const getProjectsData = createAsyncThunk("useCauses/getProjectsData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `projects?pagination[pageSize]=1000&${populateDistrict}&populate[cause]${populateImage}[populate][related][on][api::cause.cause][populate][district]=*`
    )
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

export const getActivitiesData = createAsyncThunk("useCauses/getActivitiesData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`activities?pagination[pageSize]=1000&populate=*`)
    if (response.data) {
      return response.data.data
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

const useCauses = createSlice({
  name: "useCauses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCauseByID.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCauseByID.fulfilled, (state, action) => {
      state.loading = false
      state.causesData = action.payload
    })
    builder.addCase(getCauseByID.rejected, (state, action) => {
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

    builder.addCase(getActivitiesData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getActivitiesData.fulfilled, (state, action) => {
      state.loading = false
      state.activities = action.payload
    })
    builder.addCase(getActivitiesData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })
  },
})

export default useCauses.reducer
