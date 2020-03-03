import * as React from 'react';
import { IPagedTableImpl, IPagedDataContext, IPagedTablePaging, IPagedTableBaseProps, IUsePagedTableProps } from './models';
interface IDefaultPagedTableImpl<T> extends IPagedTableImpl<T>, IPagedTablePaging {
}
export interface IPagedTableProps<T> extends IDefaultPagedTableImpl<T>, IPagedTableBaseProps<T> {
    footer?: React.ReactNode;
}
export interface IPagedTableHook<T> {
    reloadData: () => void;
    isLoading: boolean;
    renderProps: IDefaultPagedTableImpl<T>;
    totalRows: number;
    page: number;
}
export declare const PagedDataContext: React.Context<IPagedDataContext>;
export declare function PagedTable<T>({ header, tableClassName, renderRow, emptyRowText, rows, pagedDataContext, totalRows, pageSize, page, handleChangePage, handleChangeRowsPerPage, colSpan, footer, }: IPagedTableProps<T>): JSX.Element;
declare function usePagedTable<T>(props: IUsePagedTableProps<T>): IPagedTableHook<T>;
export default usePagedTable;
