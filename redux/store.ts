import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartOpen from "./cartOpen";
import cartReducer from "./cartReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import favouritesReducer from "./favouritesReducer";

// ...

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  cartOpen: cartOpen,
  favourite: favouritesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
