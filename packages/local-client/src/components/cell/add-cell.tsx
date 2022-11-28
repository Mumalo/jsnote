import React from "react";
import './add-cell.css'
import { useActions } from "../../hooks";

interface AddCellProps {
	prevCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ( { prevCellId } ) => {
	const { insertCellBefore } = useActions();

	return (
			<div className='add-cell'>
				<div className='add-buttons'>
					<button
							onClick={() => insertCellBefore(prevCellId, 'code')}
							className='button is-rounded is-primary is-small'
					>
						<span className='icon is-small'>
							<i className='fas fa-plus'/>
						</span>
						<span>Code</span>
					</button>
					<button
							onClick={() => insertCellBefore(prevCellId, 'text')}
							className='button is-rounded is-primary is-small'
					>
						<span className='icon is-small'>
							<i className='fas fa-plus'/>
						</span>
						<span>Text</span>
					</button>
				</div>
				<div className='divider' />
			</div>
	)
}

export default AddCell;
