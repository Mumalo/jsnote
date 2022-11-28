import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from '../state';
import {useMemo} from "react";


// only bind action creators only once
// and not on every app state change
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    // rerun when dep changes.. in this case dispatch
    return bindActionCreators(actionCreators, dispatch)
  }, [dispatch]);
};
