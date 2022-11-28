import React, {Fragment, useEffect} from "react";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { usedTypeSelector } from "../../hooks";
import { useActions } from "../../hooks";

export const CellList: React.FC = () => {
  // the same like mapStateToProps in class based
  const cells = usedTypeSelector(( { cells: { order, data }}) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => {
    return(
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
    )
  })

  return (
      <div className="cell-list">
        <AddCell prevCellId={null} />
        {renderedCells}
      </div>
  )
};
