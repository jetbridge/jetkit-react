import * as React from 'react';
import { IPagedTableImpl, IPagedTableBaseProps, IUsePagedTableProps } from './models';
export interface ISmoothPagedTableProps<T> extends IPagedTableImpl<T>, IPagedTableBaseProps<T> {
    handleDidScrollToEnd: () => void;
    rootClassName?: string;
    isLoading?: boolean;
}
export declare function SmoothPagedTable<T>({ header, tableClassName, rootClassName, renderRow, emptyRowText, rows, pagedDataContext, handleDidScrollToEnd, colSpan, isLoading, }: ISmoothPagedTableProps<T>): JSX.Element;
export declare function useSmoothPagedTable<T>(props: IUsePagedTableProps<T>): {
    isLoading: boolean;
    reloadData: () => Promise<void>;
    page: number;
    renderProps: {
        rows: T[];
        page: number;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        pageSize: number;
        setPageSize: React.Dispatch<React.SetStateAction<number>>;
        isLoading: boolean;
        handleDidScrollToEnd: () => void;
        pagedDataContext: {
            reloadData: () => Promise<void>;
        };
    };
};
