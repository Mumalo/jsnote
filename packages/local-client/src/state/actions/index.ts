import {
	BundleCompleteAction,
	BundleStartAction
} from "./bundle.actions";

import {
	DeleteCellAction,
	FetchCellsAction,
	FetchCellsCompleteAction,
	FetchCellsErrAction,
	InsertCellAfterAction,
	MoveCellAction, SaveCellsErrAction,
	UpdateCelAction
} from "./cell.actions";

export type Action =
		| MoveCellAction
		| DeleteCellAction
		| InsertCellAfterAction
		| UpdateCelAction
    | BundleStartAction
    | BundleCompleteAction
		| FetchCellsAction
		| FetchCellsCompleteAction
		| FetchCellsErrAction
		| SaveCellsErrAction
