import { WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
declare const styles: () => Record<"cell", import("@material-ui/styles").CSSProperties | (() => import("@material-ui/styles").CSSProperties)>;
interface IEmptyTableRowProps extends WithStyles<typeof styles> {
    rowText?: string;
    colSpan: number;
    rowHeight?: string;
    fontSize?: string;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<IEmptyTableRowProps>, "children" | "fontSize" | "colSpan" | "rowText" | "rowHeight"> & import("@material-ui/core/styles").StyledComponentProps<"cell">>;
export default _default;
