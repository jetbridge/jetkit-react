import * as React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { IMenuSection } from '../types'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

const styles = (theme: Theme) =>
    createStyles({
        selectedBackground: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
        },
        defaultBackground: {
            backgroundColor: '#F6F6F8',
            color: theme.palette.primary.contrastText,
        },
        selectedItem: {
            backgroundColor: theme.palette.primary.main,
        },
        item: {
            // textTransform: 'uppercase',
            fontSize: '1.2rem',
            paddingLeft: '2.5rem',
        },
        selectedSectionTitle: {
            backgroundColor: 'transparent !important',
            fontSize: '2rem',
        },
        subsectionTitle: {
            letterSpacing: '0.25em',
            fontSize: '0.9rem',
            color: theme.palette.primary.contrastText,
        },
        selectedSubsectionTitle: {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bolder',
        },
        subSectionsList: {
            width: '100%',
        },
        sectionTitle: {
            letterSpacing: '0.25em',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            color: 'black',
            fontWeight: 'bold',
            marginLeft: '1rem',
        },
        sectionRoot: {
            margin: '10px 0',
            boxShadow: 'none',
            '&:before': {
                height: 0,
            },
        },
    })

interface ISectionProps extends WithStyles<typeof styles> {
    section: IMenuSection
    expanded?: boolean
    selectedSubSection?: string
    onClick?: (section: IMenuSection, subSectionTitle?: string) => void
}

const Section: React.FC<ISectionProps> = ({ classes, onClick, selectedSubSection, expanded, section }) => {
    const handleClick = (title?: string) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (onClick) {
            onClick(section, title)
        }
        event.stopPropagation()
    }

    const subSections = section.subsections || []
    const menuListClass = expanded ? classes.selectedBackground : classes.defaultBackground

    return (
        <ExpansionPanel
            onClick={handleClick()}
            classes={{ root: classes.sectionRoot }}
            className={classNames(menuListClass)}
            expanded={expanded}
        >
            <ExpansionPanelSummary>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    {section.icon}
                    <Typography className={classes.sectionTitle}>{section.title}</Typography>
                </span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: 0 }}>
                <List className={classes.subSectionsList}>
                    {subSections.map(subSection => (
                        <ListItem
                            onClick={handleClick(subSection.title)}
                            key={subSection.title}
                            button={true}
                            className={classNames(
                                classes.item,
                                selectedSubSection === subSection.title ? classes.selectedItem : undefined
                            )}
                        >
                            {subSection.icon && <span style={{ marginRight: 12 }}>{subSection.icon}</span>}
                            <Typography
                                className={classNames(
                                    classes.subsectionTitle,
                                    selectedSubSection === subSection.title
                                        ? classes.selectedSubsectionTitle
                                        : undefined
                                )}
                            >
                                {subSection.title}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default withStyles(styles)(Section)
