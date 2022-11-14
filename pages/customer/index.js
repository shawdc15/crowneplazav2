import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import HomeCard from '../../components/HomeCard'
import HomeCarousel from '../../components/HomeCarousel'
import { MapSvg } from '../../components/Svg'
import About from '../../components/About'
import { Header, Footer } from '../../components'
function Home() {
  return (
    <>
      <Head>
        <title>Home | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="home" />
      <div>
        <div>
          <HomeCarousel />
        </div>
        <div className=" justify-between  bg-slate-900 px-4 py-4 text-slate-300 md:flex ">
          <div className="flex items-center">
            <div>
              <MapSvg />
            </div>
            <p className="ml-3 text-lg">
              We are now located : 094 Tagaytay - Nasugbu Hwy, Tagaytay, Cavite
            </p>
          </div>
          <a
            target="_blank"
            href="https://www.google.com/maps/dir//14.096166,120.916313/@14.0961481,120.8464555,12z"
            className="ml-7 block p-2 text-emerald-500 underline"
          >
            View on Map
          </a>
        </div>
      </div>
      <HomeCard />
      <About />
      <Footer />
    </>
  )
}

export default Home
