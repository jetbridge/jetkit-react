export interface IMenuSection {
    title: string
    path: string
    subsections?: IMenuSection[]
    expanded?: boolean
    icon?: React.ElementType
}
