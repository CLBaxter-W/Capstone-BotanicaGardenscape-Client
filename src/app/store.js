import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../components_db/registrationSlice";
import userReducer from "../components_db/userSlice";
import referenceReducer from "../components_db/referenceSlice";
import plantsReducer from "../components_db/plantSlice";
import currentView from "../components_db/currentViewSlice";

import { api } from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    registration: registrationReducer,
    user: userReducer,
    reference: referenceReducer,
    plants: plantsReducer,
    currentView,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
