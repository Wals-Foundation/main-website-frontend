/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/src/logic/config/base"
import { AboutOrganization, AboutOrganizationApproach, AboutOrganizationValues, Contact, Gallery, Socials } from "@/utils/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

type InitialState = {
  loading: boolean
  aboutOrganization: AboutOrganization
  ourValues: AboutOrganizationValues[]
  ourApproach: AboutOrganizationApproach[]
  contact: Contact
  socials: Socials[]
  gallery: Gallery[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  aboutOrganization: {},
  contact: {},
  socials: [],
  ourApproach: [],
  ourValues: [],
  gallery: [],
  error: "",
}

export const getAboutOrganizationData = createAsyncThunk(
  "useAboutOrganiztion/getAboutOrganizationData",
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

export const getContactData = createAsyncThunk("useAboutOrganiztion/getContactData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/contact`)
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

export const getGalleryData = createAsyncThunk<Gallery[], void, { rejectValue: { message: string; status?: number } }>(
  "useAboutOrganiztion/getGalleryData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/gallery-items?pagination[pageSize]=1000&populate[image][populate]=source`)

      const rawData = response.data?.data || []

      // Extract only { name, url } from each image source
      const images: Gallery[] = rawData.flatMap(
        (item: any) =>
          item?.image?.source?.map((source: any) => ({
            name: source.name,
            url: source.url,
          })) || []
      )

      return images
    } catch (error) {
      let errorMessage = "An unknown error occurred"
      let statusCode: number | undefined

      if (axios.isAxiosError(error)) {
        statusCode = error.response?.status
        errorMessage = JSON.stringify(error.response?.data) || error.message || "An error occurred"
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      console.error(`Error: ${errorMessage}, Status: ${statusCode || "Unknown"}`)
      return rejectWithValue({ message: errorMessage, status: statusCode })
    }
  }
)

export const getSocialsData = createAsyncThunk("useAboutOrganiztion/getSocialsData", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/social-medias?pagination[pageSize]=1000&populate=*`)
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

export const getAboutOrganizationValues = createAsyncThunk(
  "useAboutOrganiztion/getAboutOrganizationValues",
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
  "useAboutOrganiztion/getAboutOrganizationApproach",
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
  name: "useAboutOrganiztion",
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

    builder.addCase(getContactData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getContactData.fulfilled, (state, action) => {
      state.loading = false
      state.contact = action.payload
    })
    builder.addCase(getContactData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getSocialsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getSocialsData.fulfilled, (state, action) => {
      state.loading = false
      state.socials = action.payload
    })
    builder.addCase(getSocialsData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Users were not created"
    })

    builder.addCase(getGalleryData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getGalleryData.fulfilled, (state, action) => {
      state.loading = false
      state.gallery = action.payload
      console.log(action.payload)
    })
    builder.addCase(getGalleryData.rejected, (state, action) => {
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
