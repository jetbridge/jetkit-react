"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Typography_1 = require("@material-ui/core/Typography");
const styles_1 = require("@material-ui/core/styles");
const TableCell_1 = require("@material-ui/core/TableCell");
const TableRow_1 = require("@material-ui/core/TableRow");
const React = require("react");
const styles = () => styles_1.createStyles({
    cell: {
        padding: '1rem',
    },
});
const EmptyTableRow = ({ classes, rowText = 'No Data', colSpan, rowHeight, fontSize, }) => (React.createElement(TableRow_1.default, { style: { height: rowHeight } },
    React.createElement(TableCell_1.default, { className: classes.cell, colSpan: colSpan, align: "center" },
        React.createElement(Typography_1.default, { style: { fontSize: fontSize || '1rem' } }, rowText))));
exports.default = styles_1.withStyles(styles)(EmptyTableRow);
//# sourceMappingURL=emptyTableRow.js.map