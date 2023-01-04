import { createSlice } from '@reduxjs/toolkit'

export interface ActiveState {
    active: string
}

const initialState: ActiveState = {
    active: "home"
}

export const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: {
        getActive: (values, action) => {
            const active = action.payload
            values.active = active
        }
    },
})

// Action creators are generated for each case reducer function
export const { getActive } = activeSlice.actions

export default activeSlice.reducer