import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles';
interface IUserSection extends WithStyles<typeof styles> {
    avatarSrc?: string;
    userName: string;
}
declare const styles: () => Record<"img" | "userNameAndExpandIconWrapper" | "userName", import("@material-ui/styles").CSSProperties | (() => import("@material-ui/styles").CSSProperties)>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<IUserSection>, "children" | "userName" | "avatarSrc"> & import("@material-ui/core/styles").StyledComponentProps<"img" | "userNameAndExpandIconWrapper" | "userName">>;
export default _default;
