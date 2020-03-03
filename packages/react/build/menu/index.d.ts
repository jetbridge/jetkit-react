import * as React from 'react';
import { IMenuSection } from '../types';
import { WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
declare const styles: (theme: Theme) => Record<"container", import("@material-ui/styles").CSSProperties | (() => import("@material-ui/styles").CSSProperties)>;
interface IMenuProps extends WithStyles<typeof styles> {
    sections: IMenuSection[];
    defaultSelectedSubSection?: object;
    defaultSelectedSection?: IMenuSection;
    sectionSelected?: (section: IMenuSection, subSectionTitle: string) => void;
    logoSrc: string;
    userName?: string;
    avatarSrc?: string;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<IMenuProps>, "children" | "userName" | "avatarSrc" | "defaultSelectedSection" | "sectionSelected" | "defaultSelectedSubSection" | "sections" | "logoSrc"> & import("@material-ui/core/styles").StyledComponentProps<"container">>;
export default _default;
