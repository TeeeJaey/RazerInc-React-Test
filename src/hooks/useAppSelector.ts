import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ProfileState } from "../model";

export const useAppSelector: TypedUseSelectorHook<ProfileState> = useSelector;
