import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
    user: {
        email: string,
        name: string,
        phoneNumber: string
    }
}

const initialState: UserState = {
    user: {
        email: "",
        name: "",
        phoneNumber: ""
    },
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (values, action) => {
            const userInfo = action.payload
            values.user = {
                email: userInfo.email,
                name: userInfo.name,
                phoneNumber: userInfo.phone_number
            }
        },
        removeUser: (values) => {
            values.user = {
                email: "",
                name: "",
                phoneNumber: ""
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { getUser, removeUser } = counterSlice.actions

export default counterSlice.reducer