import produce from "immer";
import { ActionType } from "../action.types";
import { Action } from "../actions";

interface BundlesState {
	[key: string]:
			{
				loading: boolean;
				code: string;
				err: string;
			} | undefined;
}

const INITIAL_STATE: BundlesState = {};

const reducer = produce((
		state: BundlesState = INITIAL_STATE,
		action: Action
): BundlesState => {
	switch (action.type) {
		case ActionType.BUNDLE_START:
			state[action.payload.cellId] = {
				loading: true,
				code: '',
				err: ''
			}
			return state;
		case ActionType.BUNDLE_COMPLETE:
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: ''
			}
			return state;
		default:
			return state;
	}
}, INITIAL_STATE);

export default reducer;
