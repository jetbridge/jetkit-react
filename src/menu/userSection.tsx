import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

interface IUserSection extends WithStyles<typeof styles> {
  avatarSrc?: string
  userName: string
}

const styles = () =>
  createStyles({
    img: {
      borderRadius: '50%',
      marginLeft: '10%',
    },
    userNameAndExpandIconWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    userName: {
      fontSize: 18,
      fontFamily: 'Avenir',
    },
  })

const UserSection: React.FC<IUserSection> = ({ avatarSrc, userName, classes }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <img width="100" height="100" className={classes.img} src={avatarSrc} alt="avatar" />
      <span className={classes.userNameAndExpandIconWrapper}>
        <Typography className={classes.userName}>{userName}</Typography>
        <IconButton>
          <ExpandMore />
        </IconButton>
      </span>
    </div>
  )
}

export default withStyles(styles)(UserSection)
