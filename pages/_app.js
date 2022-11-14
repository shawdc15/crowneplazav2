import '../styles/globals.css'
import { PageLayout } from '../components'
import { AppWrapper } from '../context/AppContext'
import '../styles/print.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AppWrapper>
    </>
  )
}

export default MyApp
