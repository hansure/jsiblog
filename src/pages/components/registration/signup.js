import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'
const Signup = () => {
    const [name, setName] = useState('')
    const [pNo, setPNo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const paperStyle = { padding: 20, width: 400, margin: '0 auto' }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const marginTop = { marginTop: 5 }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant='caption' gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label='Name'
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='name'
            value={name}
          />
          <TextField
            fullWidth
            label='Email'
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            id='emailAddress'
            value={email}
          />
          <FormControl component='fieldset' style={marginTop}>
            <FormLabel component='legend'>Gender</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='gender'
              style={{ display: 'initial' }}
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label='Phone Number'
            placeholder='Enter your phone number'
            onChange={(e) => setPNo(e.target.value)}
            type='text'
            id='phone'
            value={pNo}
          />
          <TextField
            fullWidth
            label='Password'
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='pass'
            value={password}
          />
          <TextField
            fullWidth
            label='Confirm Password'
            placeholder='Confirm your password'
          />
          <FormControlLabel
            control={<Checkbox name='checkedA' />}
            label='I accept the terms and conditions.'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={email === '' || password === ''}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                  window.location.href = '/'
                })
                .catch(function (error) {
                  const message = error.message
                })
            }}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}
export default Signup
