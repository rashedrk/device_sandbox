import { baseApi } from "./api/baseApi";
import uiReducer from './features/ui/uiSlice';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    ui: uiReducer,
};