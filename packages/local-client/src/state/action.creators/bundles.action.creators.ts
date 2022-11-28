import { Dispatch } from "redux";
import bundle from "../../bundler";
import {ActionType} from "../action.types";

export const createBundle = (cellId: string, rawCode: string) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId,
			},
		});

		const result = await bundle(rawCode);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: {
					code: result.code,
					err: result.err
				}
			}
		});

	}
}
