import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
