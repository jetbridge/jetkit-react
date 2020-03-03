"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classnames_1 = require("classnames");
const styles_1 = require("@material-ui/styles");
const TableBody_1 = require("@material-ui/core/TableBody");
const Table_1 = require("@material-ui/core/Table");
const __1 = require("../..");
const emptyTableRow_1 = require("../emptyTableRow");
const useSmoothTableStyles = styles_1.makeStyles({
    smoothTableRoot: {
        height: 500,
        overflowX: 'hidden',
        overflowY: 'scroll',
    },
});
function SmoothPagedTable({ header, tableClassName, rootClassName, renderRow, emptyRowText, rows, pagedDataContext, handleDidScrollToEnd, colSpan, isLoading, }) {
    const classes = useSmoothTableStyles();
    // render rows
    const rowsToDisplay = React.useMemo(() => rows.map(data => renderRow(data)), [rows, renderRow]);
    // if colSpan is not specified - try to figure it out from the header
    let columnsSpan = colSpan || 0;
    if (!columnsSpan && header && header.props && header.props.children) {
        // <TableHead> <TableRow> <TableCell>...</TableCell> <TableCell>...</TableCell> ...
        const headerChild = React.Children.only(header.props.children); // TableRow
        columnsSpan = React.Children.count(headerChild.props.children) || 1; // TableCells count
    }
    else if (!columnsSpan) {
        columnsSpan = 1;
    }
    const handleScroll = React.useCallback((event) => {
        const element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            handleDidScrollToEnd();
        }
    }, [handleDidScrollToEnd]);
    return (React.createElement(__1.PagedDataContext.Provider, { value: pagedDataContext },
        React.createElement("div", { onScroll: handleScroll, className: classnames_1.default(rootClassName, classes.smoothTableRoot) },
            React.createElement(Table_1.default, { className: tableClassName },
                header ? header : null,
                React.createElement(TableBody_1.default, { "data-testid": "paged-body" },
                    rowsToDisplay && rowsToDisplay.length ? (rowsToDisplay) : (React.createElement(emptyTableRow_1.default, { colSpan: columnsSpan, rowText: emptyRowText })),
                    isLoading && React.createElement(emptyTableRow_1.default, { colSpan: columnsSpan, rowText: 'Loading' }))))));
}
exports.SmoothPagedTable = SmoothPagedTable;
function useSmoothPagedTable(props) {
    const { apiCall, queryParams, autoLoad = true, defaultPageSize = 25 } = props;
    const [page, setPage] = React.useState(0);
    const [lastPage, setLastPage] = React.useState();
    const [pageSize, setPageSize] = React.useState(defaultPageSize);
    const [error, setError] = React.useState();
    const [rows, setRows] = React.useState({ 0: [] });
    const [isLoading, setIsLoading] = React.useState(false);
    // load data
    const loadAPI = React.useCallback(async () => {
        // fetch data from paginated API
        try {
            if (lastPage && page + 1 > lastPage)
                return;
            setIsLoading(true);
            // TablePagination is zero-indexed, API is not
            const res = await apiCall({ page: page + 1, pageSize, queryParams: queryParams });
            setRows(prev => ({
                ...prev,
                [page]: res.rows,
            }));
            setLastPage(res.last_page);
            // set newPage as current page
            // someone maybe scrolling like crazy so let's always remember last page
            if (res.page)
                setPage(prevPage => Math.max(prevPage, res.page));
            else
                setPage(0);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setIsLoading(false);
        }
    }, [setLastPage, lastPage, apiCall, page, pageSize, queryParams, setIsLoading, setError]);
    // load on component mount
    React.useEffect(() => {
        if (autoLoad && !error)
            loadAPI();
    }, [autoLoad]);
    // pagination controls callback
    const handleDidScrollToEnd = React.useCallback(() => {
        loadAPI();
    }, [loadAPI]);
    // our PagedDataContext
    const pagedDataContext = React.useMemo(() => ({ reloadData: loadAPI }), [loadAPI]);
    // does useMemo help here at all?
    return React.useMemo(() => ({
        isLoading,
        reloadData: loadAPI,
        page,
        renderProps: {
            rows: Object.values(rows).reduce((acc, val) => acc.concat(val), []),
            page,
            setPage,
            pageSize,
            setPageSize,
            isLoading,
            handleDidScrollToEnd,
            pagedDataContext,
        },
    }), [isLoading, loadAPI, rows, page, setPage, pageSize, setPageSize, handleDidScrollToEnd, pagedDataContext]);
}
exports.useSmoothPagedTable = useSmoothPagedTable;
//# sourceMappingURL=smoothPagedTable.js.map