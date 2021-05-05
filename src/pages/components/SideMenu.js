import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Link from 'next/link'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

const drawerWidth = 240
const menuItems = [
  {
    listIcon: <MailIcon />,
    listText: 'Home',
    listPath: '/',
  },
  {
    listIcon: <InboxIcon />,
    listText: 'Blog Post',
    listPath: '/containers/blogs/blog',
  },
  {
    listIcon: <InboxIcon />,
    listText: 'Portfolio',
    listPath: '/portfolio',
  },
  {
    listIcon: <MailIcon />,
    listText: 'Contact',
    listPath: '/contact',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  searchInput: {
    opacity: '0.6',
    color: '#000000',
    padding: `0px ${theme.spacing(2)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#E5E4E2',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(2),
    },
  },
  appBar: {
    color: '#fff',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems='center'>
            <Grid item>
              <IconButton aria-label='search' color='#fff'>
                <InputBase
                  placeholder='Search topics'
                  className={classes.searchInput}
                  startAdornment={<SearchIcon fontSize='small' />}
                />
              </IconButton>
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <IconButton>
                <Badge badgeContent={0} color='secondary'>
                  <NotificationsNoneIcon fontSize='small' />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={0} color='primary'>
                  <ChatBubbleOutlineIcon fontSize='small' />
                </Badge>
              </IconButton>
              <IconButton>
                <PowerSettingsNewIcon fontSize='small' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((lsItem, key) => (
            <ListItem button key={key}>
              <Link href={lsItem.listPath}>
                <a>
                  <div className={classes.root}>
                    <ListItemIcon className={classes.listItem}>
                      {lsItem.listIcon}
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItem}
                      primary={lsItem.listText}
                    />
                  </div>
                </a>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}
