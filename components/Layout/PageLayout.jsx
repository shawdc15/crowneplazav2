import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

import Head from 'next/head'
const PageLayout = ({ children }) => {
  return (
    <div className=" m-auto flex min-h-screen flex-col">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <Header /> */}
      {children}
    </div>
  )
}

export default PageLayout
