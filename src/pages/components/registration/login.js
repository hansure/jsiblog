import React, { useState } from 'react'
import firebaseClient from '../../api/config/firebaseClient'
import firebase from 'firebase/app'
import 'firebase/auth'
import {
  Grid,
  Paper,
  Avatar,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Typography,
  Link,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
const Login = ({ handleChange }) => {
  firebaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const paperStyle = {
    padding: 20,
    height: '73vh',
    width: 400,
    margin: '0 auto',
  }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <FormControl required>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            id='emailAddress'
            value={email}
            aria-describedby='email-helper-text'
          />
          <FormHelperText id='email-helper-text'>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <br></br>
        <FormControl required>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='pass'
            value={password}
            aria-describedby='password-helper-text'
          />
          <FormHelperText id='password-helper-text'>
            password length must be greater than 6.
          </FormHelperText>
        </FormControl>
        <br></br>
        <FormControlLabel
          control={<Checkbox name='checkedB' color='primary' />}
          label='Remember me'
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={btnstyle}
          fullWidth
          disabled={email === '' || password === ''}
          onClick={async () => {
            await firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(function (firebaseUser) {
                window.location.href = '/containers/blog'
              })
              .catch(function (error) {
                const message = error.message
              })
          }}
        >
          Sign in
        </Button>
        <Typography>
          <Link href='#'>Forgot password ?</Link>
        </Typography>
        <Typography>
          {' '}
          Do you have an account ?
          <Link href='#' onClick={() => handleChange('event', 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login
