import React from 'react'
import Link from 'next/link'
import { Sidebar, Header } from '../../components'
import { BackSvg } from '../Svg'
import Head from 'next/head'
import Footer from '../Footer'

const HelpHeader = ({ link, title }) => {
  return (
    <>
      <Head>
        <title>Settings | Help</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto mb-auto w-full  max-w-container">
        <div className=" px-9">
          <h1 className="mb-4 py-4 text-xl text-slate-500">
            Settings / <Link href={`/customer/settings/help`}>Help</Link> /
            <span className="text-emerald-500"> {title}</span>
          </h1>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="w-full p-4">
              <h1 className="mb-4 flex items-center text-xl">
                <Link href={`/customer/settings/help`}>
                  <a>
                    <BackSvg />
                  </a>
                </Link>
                {title}
              </h1>
              <p className="px-4 leading-10 text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                modi exercitationem beatae delectus hic corporis soluta
                accusamus doloribus eaque mollitia praesentium recusandae
                provident nulla voluptates rerum, aperiam totam! Fugit
                asperiores quod, facere nihil quam hic non dignissimos maxime ea
                eos ullam perferendis repellendus tempora ut mollitia vel
                quibusdam, necessitatibus ratione voluptate eveniet blanditiis
                beatae, ipsam nulla? Unde nam quod eos?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HelpHeader
