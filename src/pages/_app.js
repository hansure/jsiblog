import '../../styles/globals.css'
// import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { AuthProvider } from './api/config/auth'

function MyApp({ Component, pageProps }) {
  return (
      <CssBaseline>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CssBaseline>
  )
}

export default MyApp
