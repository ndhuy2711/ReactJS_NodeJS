import { createSlice } from '@reduxjs/toolkit'

export interface ItemActiveState {
    item_active: string[]
}

const initialState: ItemActiveState = {
    item_active: [""]
}

export const activeItemSlice = createSlice({
    name: 'item_active',
    initialState,
    reducers: {
        getItemActive: (values, action) => {
            const item_active = action.payload
            values.item_active = item_active
        }
    },
})

// Action creators are generated for each case reducer function
export const { getItemActive } = activeItemSlice.actions

export default activeItemSlice.reducer