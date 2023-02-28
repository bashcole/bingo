import {configureStore} from '@reduxjs/toolkit';

import UISlice from "./reducers/uiSlice";

const store = configureStore({
    reducer: {ui: UISlice},
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>