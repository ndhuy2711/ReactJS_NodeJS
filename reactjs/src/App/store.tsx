import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from "../Components/Form/userSlice"
import activeReducer from "../Components/Layout/activeSlice"
import activeItemReducer from "../Components/Layout/activeItemSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
    user: userReducer,
    active: activeReducer,
    item_active: activeItemReducer
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)