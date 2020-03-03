import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { IMenuSection } from '../types';
import { WithStyles } from '@material-ui/core/styles';
declare const styles: (theme: Theme) => Record<"item" | "selectedBackground" | "defaultBackground" | "selectedItem" | "selectedSectionTitle" | "subsectionTitle" | "selectedSubsectionTitle" | "subSectionsList" | "sectionTitle" | "sectionRoot", import("@material-ui/styles").CSSProperties | (() => import("@material-ui/styles").CSSProperties)>;
interface ISectionProps extends WithStyles<typeof styles> {
    section: IMenuSection;
    expanded?: boolean;
    selectedSubSection?: string;
    onClick?: (section: IMenuSection, subSectionTitle?: string) => void;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<ISectionProps>, "section" | "expanded" | "children" | "onClick" | "selectedSubSection"> & import("@material-ui/core/styles").StyledComponentProps<"item" | "selectedBackground" | "defaultBackground" | "selectedItem" | "selectedSectionTitle" | "subsectionTitle" | "selectedSubsectionTitle" | "subSectionsList" | "sectionTitle" | "sectionRoot">>;
export default _default;
