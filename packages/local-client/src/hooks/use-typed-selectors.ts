import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state/reducers";

// to type the data stored in the store
export const usedTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
