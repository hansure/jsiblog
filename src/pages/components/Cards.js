import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from './Card/Card'
import CardHeader from './Card/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardBody from './Card/CardBody'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ShareIcon from '@material-ui/icons/Share'
// import avatarUrl from '../assets/img/faces/avatar.jpg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Avatar, IconButton, CardMedia } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: theme.spacing(8),
  },
}))

const Cards = (props) => {
  const { title, description } = props
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label='settings'>
            <ShareIcon />
          </IconButton>
        }
      >{title}</CardHeader>
      <CardMedia style={{ height: '150px' }} />
      <CardBody>
        <Typography variant='body2' component='p'>
          {description}
        </Typography>
      </CardBody>
      <CardActions>
        <Button size='small'>
          More <ExpandMoreIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

export default Cards
