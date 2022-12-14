import { ActionType } from "../action.types";


export interface BundleStartAction {
	type: ActionType.BUNDLE_START
	payload: {
		cellId: string;
		bundle: {
			code: string;
			err: string;
		}
	}
}

export interface BundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE
	payload: {
		cellId: string;
		bundle: {
			code: string;
			err: string;
		}
	}
}
