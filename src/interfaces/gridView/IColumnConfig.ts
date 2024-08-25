import ISort from "./ISort";

export default interface IColumnConfig {
  dataField: string;
  title?: string;
  dataType?: number;
  align?: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  enum?: string;
  sort?: ISort;
  sortIcon?: string;
}
