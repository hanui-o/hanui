// Table Kit - DataTableKit Component
// 데이터 테이블 컴포넌트

'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Pagination,
  Skeleton,
} from '@hanui/react';
import {
  Search,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import type {
  TableColumn,
  SortState,
  FilterState,
  PaginationState,
} from '../types/table';
import {
  sortData,
  filterData,
  paginateData,
  exportToCSV,
} from '../hooks/useTable';

interface DataTableKitProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;

  // 정렬
  sortable?: boolean;
  defaultSort?: SortState;
  onSort?: (sort: SortState | null) => void;
  serverSideSort?: boolean;

  // 필터
  filterable?: boolean;
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;

  // 검색
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  serverSideSearch?: boolean;

  // 페이지네이션
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageSizeOptions?: number[];
  serverSidePagination?: boolean;

  // 선택
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  rowKey?: keyof T;

  // 내보내기
  exportable?: boolean;
  exportFilename?: string;

  // 스타일
  className?: string;
  emptyMessage?: string;
}

export function DataTableKit<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  sortable = true,
  defaultSort,
  onSort,
  serverSideSort = false,
  filterable = false,
  filters: externalFilters,
  onFilterChange,
  searchable = true,
  searchKeys,
  searchPlaceholder = '검색...',
  onSearch,
  serverSideSearch = false,
  pagination: externalPagination,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [10, 20, 50, 100],
  serverSidePagination = false,
  selectable = false,
  selectedRows: externalSelectedRows,
  onSelectionChange,
  rowKey = 'id' as keyof T,
  exportable = true,
  exportFilename = 'data',
  className,
  emptyMessage = '데이터가 없습니다',
}: DataTableKitProps<T>) {
  // 내부 상태 (서버 사이드가 아닐 경우 사용)
  const [internalSort, setInternalSort] = useState<SortState | null>(
    defaultSort || null
  );
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPage, setInternalPage] = useState(1);
  const [internalLimit, setInternalLimit] = useState(pageSizeOptions[0]);
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>([]);

  const sort = internalSort;
  const search = internalSearch;
  const page = externalPagination?.page ?? internalPage;
  const limit = externalPagination?.limit ?? internalLimit;
  const selectedRows = externalSelectedRows ?? internalSelectedRows;

  // 클라이언트 사이드 데이터 처리
  const processedData = useMemo(() => {
    let result = [...data];

    // 검색 (클라이언트 사이드)
    if (!serverSideSearch && search && searchKeys) {
      result = filterData(result, {}, searchKeys, search);
    }

    // 정렬 (클라이언트 사이드)
    if (!serverSideSort && sort) {
      result = sortData(result, sort.key, sort.order);
    }

    // 페이지네이션 (클라이언트 사이드)
    if (!serverSidePagination) {
      const paginated = paginateData(result, page, limit);
      return {
        data: paginated.data,
        total: paginated.total,
        totalPages: paginated.totalPages,
      };
    }

    return {
      data: result,
      total: externalPagination?.total ?? result.length,
      totalPages:
        externalPagination?.totalPages ?? Math.ceil(result.length / limit),
    };
  }, [
    data,
    search,
    searchKeys,
    sort,
    page,
    limit,
    serverSideSearch,
    serverSideSort,
    serverSidePagination,
    externalPagination,
  ]);

  // 정렬 핸들러
  const handleSort = useCallback(
    (key: string) => {
      const newSort: SortState | null =
        sort?.key === key
          ? sort.order === 'asc'
            ? { key, order: 'desc' }
            : null
          : { key, order: 'asc' };

      setInternalSort(newSort);
      onSort?.(newSort);
    },
    [sort, onSort]
  );

  // 검색 핸들러
  const handleSearch = useCallback(
    (value: string) => {
      setInternalSearch(value);
      setInternalPage(1);
      onSearch?.(value);
    },
    [onSearch]
  );

  // 페이지 핸들러
  const handlePageChange = useCallback(
    (newPage: number) => {
      setInternalPage(newPage);
      onPageChange?.(newPage);
    },
    [onPageChange]
  );

  // 행 개수 핸들러
  const handleLimitChange = useCallback(
    (newLimit: string) => {
      const limit = parseInt(newLimit, 10);
      setInternalLimit(limit);
      setInternalPage(1);
      onLimitChange?.(limit);
    },
    [onLimitChange]
  );

  // 선택 핸들러
  const handleSelectAll = useCallback(() => {
    const newSelection =
      selectedRows.length === processedData.data.length
        ? []
        : [...processedData.data];
    setInternalSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  }, [selectedRows.length, processedData.data, onSelectionChange]);

  const handleSelectRow = useCallback(
    (row: T) => {
      const isSelected = selectedRows.some((r) => r[rowKey] === row[rowKey]);
      const newSelection = isSelected
        ? selectedRows.filter((r) => r[rowKey] !== row[rowKey])
        : [...selectedRows, row];
      setInternalSelectedRows(newSelection);
      onSelectionChange?.(newSelection);
    },
    [selectedRows, rowKey, onSelectionChange]
  );

  // 내보내기 핸들러
  const handleExport = useCallback(() => {
    exportToCSV(data, columns, { filename: exportFilename });
  }, [data, columns, exportFilename]);

  // 정렬 아이콘 렌더링
  const renderSortIcon = (key: string) => {
    if (sort?.key !== key)
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />;
    return sort.order === 'asc' ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className={className}>
      {/* 상단 툴바 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-krds-gray-40" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          )}

          <Select value={String(limit)} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}개
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {selectable && selectedRows.length > 0 && (
            <span className="text-sm text-krds-gray-60 self-center">
              {selectedRows.length}개 선택됨
            </span>
          )}

          {exportable && (
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              CSV 내보내기
            </Button>
          )}
        </div>
      </div>

      {/* 테이블 */}
      <div className="border border-krds-gray-20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedRows.length === processedData.data.length &&
                      processedData.data.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="전체 선택"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className={
                    column.align === 'center'
                      ? 'text-center'
                      : column.align === 'right'
                        ? 'text-right'
                        : ''
                  }
                >
                  {sortable && column.sortable !== false ? (
                    <button
                      className="inline-flex items-center hover:text-krds-primary-base"
                      onClick={() => handleSort(String(column.key))}
                    >
                      {column.header}
                      {renderSortIcon(String(column.key))}
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i}>
                  {selectable && (
                    <TableCell>
                      <Skeleton className="h-5 w-5" />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : processedData.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-10 text-krds-gray-50"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              processedData.data.map((row, index) => {
                const isSelected = selectedRows.some(
                  (r) => r[rowKey] === row[rowKey]
                );
                return (
                  <TableRow
                    key={String(row[rowKey])}
                    className={isSelected ? 'bg-krds-primary-5' : ''}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectRow(row)}
                          aria-label="행 선택"
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className={
                          column.align === 'center'
                            ? 'text-center'
                            : column.align === 'right'
                              ? 'text-right'
                              : ''
                        }
                      >
                        {column.render
                          ? column.render(
                              row[column.key as keyof T],
                              row,
                              index
                            )
                          : String(row[column.key as keyof T] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      {processedData.totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            totalPages={processedData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
