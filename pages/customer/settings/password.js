import React, { useRef, useState } from 'react'
import { Footer, Sidebar } from '../../../components'
import { useAppContext } from '../../../context/AppContext'
import { updateUserPassword } from '../../../services/user.services'
import Head from 'next/head'
import { Header } from '../../../components'

const password = () => {
  const { state, dispatch } = useAppContext()

  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState(false)

  const oldPasswordRef = useRef()
  const newPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  const updateHandler = async (e) => {
    e.preventDefault()
    const data = {
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }
    let newError = {}

    const res = await updateUserPassword(data, state.user._id)
    if (res.success) {
      setSuccess(true)
      newError = {}
    } else {
      setSuccess(false)
      newError = { ...res.errors, ...newError }
    }
    setErrors(newError)
  }
  return (
    <>
      <Head>
        <title>Settings | Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto mb-auto w-full max-w-container">
        <div className="mb-auto px-9">
          <h1 className="mb-4 py-4 text-xl text-slate-500 ">
            Settings /<span className="text-emerald-500"> Password</span>
          </h1>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="w-full py-4 lg:p-4">
              {success && (
                <div className="mb-4 flex items-center justify-between rounded-md bg-emerald-500 p-4 text-white transition-all delay-75">
                  <p>Password change successfully!</p>
                  <span
                    onClick={() => setSuccess(false)}
                    className="cursor-pointer text-white underline"
                  >
                    Close
                  </span>
                </div>
              )}
              <form onSubmit={updateHandler}>
                <div className="flex w-full flex-col">
                  <span className="text-rose-500">
                    {errors?.oldPasswordError}
                  </span>
                  <label className="text-slate-900" htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                    ref={oldPasswordRef}
                    type="password"
                    id="oldPassword"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <span className="text-rose-500">
                    {errors?.newPasswordError}
                  </span>
                  <label className="text-slate-900" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    ref={newPasswordRef}
                    type="password"
                    id="newPassword"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-rose-500">
                    {errors?.confirmPasswordError}
                  </span>
                  <label className="text-slate-900" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    ref={confirmPasswordRef}
                    type="password"
                    id="confirmPassword"
                  />
                </div>

                <button
                  className="my-2 rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
                  type="submit"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default password
