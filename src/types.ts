import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

export interface IMenuSection {
    title: string
    path: string
    subsections?: IMenuSection[]
    expanded?: boolean
    icon?: React.ElementType | HTMLElement | React.ComponentType<SvgIconProps>
}
