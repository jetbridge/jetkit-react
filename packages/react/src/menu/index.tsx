import * as React from 'react'
import { IMenuSection } from '../types'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Section from './section'
import UserSection from './userSection'

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.primary.contrastText,
      backgroundColor: '#F6F6F8',
      width: theme.navWidth,
      minWidth: theme.navWidth,
      paddingTop: '2.5rem',
      boxShadow: '1px 0px 5px 0px rgba(0,0,0,0.25)',
      position: 'relative',
      alignItems: 'center',
    },
  })

interface IMenuProps extends WithStyles<typeof styles> {
  sections: IMenuSection[]
  defaultSelectedSubSection?: object
  defaultSelectedSection?: IMenuSection
  sectionSelected?: (section: IMenuSection, subSectionTitle: string) => void
  logoSrc: string
  userName?: string
  avatarSrc?: string
}

const Menu: React.FC<IMenuProps> = ({
  defaultSelectedSection,
  sectionSelected: onSectionSelected,
  defaultSelectedSubSection,
  classes,
  sections,
  logoSrc,
  userName,
  avatarSrc,
}) => {
  const [state, setState] = React.useState({
    selectedSection: defaultSelectedSection,
    selectedSubSection: defaultSelectedSubSection,
  })

  const onClick = (section: IMenuSection, subSectionTitle?: string) => {
    setState(prevState => {
      let selectedSubSection =
        subSectionTitle || (prevState.selectedSubSection && prevState.selectedSubSection[section.title])
      if (!selectedSubSection) {
        // default to first subsecion if exists
        selectedSubSection = section.subsections && section.subsections[0] ? section.subsections[0].title : undefined
      }
      return {
        selectedSection: section,
        selectedSubSection: { [section.title]: selectedSubSection },
      }
    })
  }

  React.useEffect(() => {
    if (onSectionSelected && state.selectedSection) {
      onSectionSelected(
        state.selectedSection,
        state.selectedSubSection && state.selectedSubSection[state.selectedSection.title]
      )
    }
  }, [onSectionSelected, state.selectedSection, state.selectedSubSection])

  return (
    <div className={classes.container}>
      {logoSrc && <img src={logoSrc} width="250" alt="logo" />}
      {userName && <UserSection avatarSrc={avatarSrc} userName={userName} />}
      <div>
        {sections.map(s => (
          <Section
            key={s.title}
            section={s}
            onClick={onClick}
            expanded={state.selectedSection === s}
            selectedSubSection={state.selectedSubSection && state.selectedSubSection[s.title]}
          />
        ))}
      </div>
    </div>
  )
}

export default withStyles(styles)(Menu)
