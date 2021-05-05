import React from 'react'
import Cards from '../../components/Cards'
import { Grid } from '@material-ui/core'

const Blogs = (props) => {
  const { blogs } = props
  const getBlogsCard = (blogObj) => {
    return (
      <Grid item xs={12} sm={4}>
        <Cards {...blogObj} />
      </Grid>
    )
  }
// .slice(0, 6)
  return (
    <Grid container spacing={2}>
      {blogs.map((blogObj) => getBlogsCard(blogObj))}
    </Grid>
  )
}

export default Blogs
