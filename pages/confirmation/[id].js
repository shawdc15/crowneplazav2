import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { updateUserProfile } from '../../services/user.services'
import Link from 'next/link'
import Head from 'next/head'
import { Footer, Header } from '../../components'
const Activate = () => {
  const router = useRouter()
  const [success, setSuccess] = useState(-1)

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      let id = router.query.id
      if (id) {
        const res = await updateUserProfile({ status: true }, id)
        if (res.success) {
          setSuccess(1)
        } else {
          setSuccess(0)
        }
        setIsLoading(false)
      }
    }
    load()
    console.log('sheeshh')
  }, [router.query.id])
  return (
    <div>
      <Head>
        <title>Confirmation | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="" />

      {/* <NavBar /> */}
      <div className="  min-h-screen-nav relative h-screen">
        <img
          alt="bg"
          src="/hotel1.jpg"
          className="fixed top-0 left-0 -z-10 h-screen w-full object-cover"
        />
        <div className="min-h-screen-nav relative z-10 flex h-full w-full flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center   bg-white p-5">
            {isLoading ? (
              <>
                <p className="text-xl font-semibold">
                  Validating Please Wait...
                </p>
              </>
            ) : success == 0 ? (
              <>
                <p className="text-xl font-semibold">Error Account Not Found</p>

                <Link href="/login">
                  <button className=" mt-5 rounded-full bg-emerald-500 px-10 py-3 text-xl font-bold text-white">
                    Back to Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <img src="/check.png" className="mb-5 h-20 w-20" />
                <p className="text-md">
                  Your account is now verified, You may now proceed to login.
                </p>
                <Link href="/customer">
                  <button className=" text-md mt-5 bg-emerald-500 px-10 py-3 font-bold text-white">
                    Back to Home
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Activate
