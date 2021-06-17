export interface TableColumn {
  columnName: string; // column name
  modelItem: string; // name of key of the actual data in this column
  position?: 'right' | 'left'; // should it be right-aligned or left-aligned?
  sort?: boolean; // can a column be sorted?
}
