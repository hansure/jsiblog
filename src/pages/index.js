import React from 'react'
import SideMenu from './components/SideMenu'
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core'
import Blogs from './containers/blogs'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
    },
    particlesCanva:{
    position:"absolute",
    opacity:"0.5"
  },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%',
  },
  cardSide: {
    display: 'flex',
    // marginLeft:240,
    marginTop: theme.spacing(6),
    // padding: theme.spacing(2),
  },
})

function Index({ blogs }) {
  const classes = useStyles()

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.cardSide}>
          <SideMenu />
          <Blogs blogs={blogs} />
        </div>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/blogs')
  const blogs = await res.json()

  return {
    props: {
      blogs,
    },
  }
}

export default Index
