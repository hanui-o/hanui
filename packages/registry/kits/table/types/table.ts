// Table Kit - Types
// 데이터 테이블 관련 타입 정의

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface SortState {
  key: string;
  order: 'asc' | 'desc';
}

export interface FilterState {
  [key: string]: string | string[] | undefined;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TableParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: FilterState;
  search?: string;
}

export interface TableResponse<T> {
  data: T[];
  pagination: PaginationState;
}

export interface TableState<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  sort: SortState | null;
  filters: FilterState;
  pagination: PaginationState;
  selectedRows: T[];
  search: string;
}

export interface ExportOptions {
  filename?: string;
  columns?: string[];
  includeHeaders?: boolean;
}
