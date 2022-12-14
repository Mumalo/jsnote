import React from "react";
import {Cell} from "../../state";
import CodeCell from "./code-cell";
import './cell-list-item.css';
import { TextEditor } from "../editor";
import ActionBar from "../actior-bar";

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
	let child: JSX.Element;

	if (cell.type === 'code') {
		child = (
				<>
					<CodeCell cell={cell}/>
				</>
		)
	} else {
		child = (
		<>
			<TextEditor cell={cell}/>
		</>)
	}

	return (
			<div className='cell-list-item'>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				{child}
			</div>
	)
};

export default CellListItem;
