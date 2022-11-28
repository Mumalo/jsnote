import React from "react";
import './action-bar.css'
import {useActions} from "../../hooks/use-actions";

interface ActionBarProps {
	id: string;
}

const ActionBar: React.FC<ActionBarProps> = ( { id} ) => {
	const { moveCell, deleteCell } = useActions();

	return (
			<div className='add-buttons'>
				<button
						onClick={() => moveCell(id, 'up')}
						className="button is-primary is-small"
				>
					<span>
						<i className="fas fa-arrow-up" />
					</span>
				</button>
				<button
						onClick={() => moveCell(id, 'down')}
						className="button is-primary is-small"
				>
					<i className="fas fa-arrow-down" />
				</button>
				<button
						onClick={() => deleteCell(id)}
						className="button is-primary is-small"
				>
					<i className="fas fa-times" />
				</button>
			</div>
	)
};

export default ActionBar;
