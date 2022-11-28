import { ActionType } from "../action.types";
import {Cell, CellTypes} from "../cell";
export type Direction = 'up' | 'down';

export interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction
	}
}

export interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: string;
}

export interface InsertCellAfterAction {
	type: ActionType.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		type: CellTypes
	}
}

export interface UpdateCelAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string; //cell or text
	}
}

export interface FetchCellsAction {
	type: ActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
	type: ActionType.FETCH_CELLS_COMPLETE;
	payload: Cell[];
}

export interface FetchCellsErrAction {
	type: ActionType.FETCH_CELLS_ERROR;
	payload: string;
}

export interface SaveCellsErrAction {
	type: ActionType.SAVE_CELLS_ERROR;
	payload: string;
}
