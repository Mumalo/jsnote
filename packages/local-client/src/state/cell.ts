export type CellTypes = 'code' | 'text'

export interface Cell {
  id: string;
  type: CellTypes;
  content: string; //cell for cell cell or text for text cell
}
