"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Table_1 = require("@material-ui/core/Table");
const TablePagination_1 = require("@material-ui/core/TablePagination");
const TableFooter_1 = require("@material-ui/core/TableFooter");
const TableBody_1 = require("@material-ui/core/TableBody");
const TableRow_1 = require("@material-ui/core/TableRow");
const emptyTableRow_1 = require("../emptyTableRow");
// context for our data table
// can be used by nested components to for a reload of the data, for instance when editing/deleting rows
exports.PagedDataContext = React.createContext({ reloadData: () => { } });
function PagedTable({ header, tableClassName, renderRow, emptyRowText, rows, pagedDataContext, totalRows, pageSize, page, handleChangePage, handleChangeRowsPerPage, colSpan, footer, }) {
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
    return (React.createElement(exports.PagedDataContext.Provider, { value: pagedDataContext },
        React.createElement(Table_1.default, { className: tableClassName },
            header ? header : null,
            React.createElement(TableBody_1.default, { "data-testid": "paged-body" }, rowsToDisplay && rowsToDisplay.length ? (rowsToDisplay) : (React.createElement(emptyTableRow_1.default, { colSpan: columnsSpan, rowText: emptyRowText }))),
            React.createElement(TableFooter_1.default, null,
                React.createElement(TableRow_1.default, null, footer ? (footer) : (React.createElement(TablePagination_1.default, { rowsPerPageOptions: [15, 25, 50], colSpan: columnsSpan, count: totalRows, rowsPerPage: pageSize, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })))))));
}
exports.PagedTable = PagedTable;
// do a deep equality check before actually mutating rows
// const setRowsIfChanged = <T>(resRows: T[], rows: T[], setRows: (r T[]) :void) => {
//     if (!_.isEqual(resRows, rows)) setRows(resRows)
//   }
function usePagedTable(props) {
    const { apiCall, queryParams, autoLoad = true, defaultPageSize = 25 } = props;
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(defaultPageSize);
    const [error, setError] = React.useState();
    const [rows, setRows] = React.useState([]);
    const [totalRows, setTotalRows] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    // load data
    const loadAPI = React.useCallback(async () => {
        // fetch data from paginated API
        try {
            setIsLoading(true);
            const res = await apiCall({ page: page + 1, pageSize, queryParams: queryParams });
            setRows(res.rows);
            setTotalRows(res.total);
            // TablePagination is zero-indexed, API is not
            if (res.page)
                setPage(res.page - 1);
            else
                setPage(0);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setIsLoading(false);
        }
    }, [apiCall, page, pageSize, queryParams, setIsLoading, setError]);
    // load on component mount
    React.useEffect(() => {
        if (autoLoad && !error)
            loadAPI();
    }, [loadAPI, autoLoad, error]);
    // pagination controls callback
    const handleChangePage = React.useCallback((event, newPage) => setPage(newPage), [setPage]);
    const handleChangeRowsPerPage = React.useCallback((event) => setPageSize(+event.target.value), [setPageSize]);
    // our PagedDataContext
    const pagedDataContext = React.useMemo(() => ({ reloadData: loadAPI }), [loadAPI]);
    // construct
    const renderProps = React.useMemo(() => ({
        rows,
        page,
        setPage,
        pageSize,
        setPageSize,
        totalRows,
        isLoading,
        handleChangePage,
        pagedDataContext,
        handleChangeRowsPerPage,
        setTotalRows,
    }), [
        rows,
        page,
        setPage,
        pageSize,
        setPageSize,
        totalRows,
        isLoading,
        handleChangePage,
        pagedDataContext,
        handleChangeRowsPerPage,
        setTotalRows,
    ]);
    // construct initial independent retVal that remains stable even if fields inside change
    const retVal = React.useMemo(() => ({
        isLoading: false,
        reloadData: () => { },
        renderProps,
        totalRows: 0,
        page: 0,
    }), []);
    // fill in fields of retVal
    retVal.isLoading = isLoading;
    retVal.reloadData = loadAPI;
    retVal.totalRows = totalRows;
    retVal.page = page;
    retVal.renderProps = renderProps;
    return retVal;
}
exports.default = usePagedTable;
//# sourceMappingURL=pagedTable.js.map