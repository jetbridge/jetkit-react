import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

export interface IMenuSection {
  title: string
  path: string
  subsections?: IMenuSection[]
  expanded?: boolean
  icon?: any //TODO: FIX ANY!
}

export type Eventual<T> = { loading: true } | { loading: false; value: T }
