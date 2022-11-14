import React, { useRef, useState } from 'react'
import { Footer, Sidebar } from '../../../components'
import { useAppContext } from '../../../context/AppContext'
import { updateUserProfile } from '../../../services/user.services'
import { Header } from '../../../components'
import Head from 'next/head'

const profile = () => {
  const { state, dispatch } = useAppContext()
  const [alert, setAlert] = useState('')
  const [errors, setErrors] = useState(false)

  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const usernameRef = useRef()
  const emailRef = useRef()
  const contactRef = useRef()
  const ageRef = useRef()

  const saveHandler = async (e) => {
    e.preventDefault()
    setAlert('')
    const data = {
      _id: state?.user._id,
      firstName: firstnameRef.current.value,
      lastName: lastnameRef.current.value,
      username: state?.user?.username,
      email: emailRef.current.value,
      contact: contactRef.current.value,
      age: ageRef.current.value,
    }
    if (JSON.stringify(data) == JSON.stringify(state?.user)) {
      setAlert('error')
      console.log('no')
    } else {
      const res = await updateUserProfile(data, state.user._id)
      if (res.success) {
        setAlert('success')
        console.log(res.sample)

        dispatch({ type: 'SET_USER', value: res.data })
      } else {
        console.log('yes')

        setErrors(res.errors)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Settings | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="profile" />
      <div className="mx-auto mb-auto w-full max-w-container">
        <div className="mb-auto px-9">
          <h1 className="mb-4 py-4 text-xl text-slate-500">
            Settings /<span className="text-emerald-500"> My Profile</span>
          </h1>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="w-full py-4 lg:p-4">
              {alert == 'success' && (
                <div className="mb-4 flex items-center justify-between rounded-md bg-emerald-200 p-4 text-emerald-600 transition-all delay-75">
                  <p>Your profile has been updated successfully!</p>
                  <span
                    onClick={() => setAlert('')}
                    className="cursor-pointer bg-emerald-200 text-emerald-600  underline"
                  >
                    Close
                  </span>
                </div>
              )}
              {alert == 'error' && (
                <div className="mb-4 flex items-center justify-between rounded-md bg-rose-200 p-4 text-rose-600 transition-all delay-75">
                  <p>Nothing Changes!</p>
                  <span
                    onClick={() => setAlert('')}
                    className="cursor-pointer bg-rose-200 text-rose-600  underline"
                  >
                    Close
                  </span>
                </div>
              )}
              <form onSubmit={saveHandler}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end ">
                  <div className="flex w-full flex-col ">
                    <span className="text-rose-500">
                      {errors?.firstNameError}
                    </span>
                    <label className="text-slate-900" htmlFor="fname">
                      First Name
                    </label>
                    <input
                      className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 "
                      ref={firstnameRef}
                      type="text"
                      id="fname"
                      defaultValue={state.user?.firstName}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-rose-500">
                      {errors?.lastNameError}
                    </span>

                    <label className="text-slate-900" htmlFor="lname">
                      Last Name
                    </label>
                    <input
                      className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                      ref={lastnameRef}
                      type="text"
                      id="lname"
                      defaultValue={state.user?.lastName}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-rose-500">{errors?.usernameError}</span>
                  <label className="text-slate-900" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="my-2 cursor-not-allowed rounded-md border border-slate-300 bg-slate-100 px-4 py-3 outline-none "
                    id="username"
                    readOnly
                    defaultValue={state.user?.username}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-rose-500">{errors?.emailError}</span>
                  <label className="text-slate-900" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    ref={emailRef}
                    type="email"
                    id="email"
                    defaultValue={state.user?.email}
                  />
                </div>
                <div>
                  <div className="flex flex-col">
                    <span className="text-rose-500">
                      {errors?.contactError}
                    </span>
                    <label className="text-slate-900" htmlFor="contact">
                      Contact Number
                    </label>
                    <input
                      className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                      ref={contactRef}
                      type="number"
                      id="contact"
                      defaultValue={state.user?.contact}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-rose-500">{errors?.ageError}</span>
                    <label className="text-slate-900" htmlFor="age">
                      Age
                    </label>
                    <input
                      className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                      ref={ageRef}
                      type="number"
                      id="age"
                      defaultValue={state.user?.age}
                    />
                  </div>
                </div>
                <button
                  className="my-2 rounded-md bg-slate-900 px-4 py-4 text-slate-300 disabled:bg-slate-600"
                  type="submit"
                >
                  Save Changes
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

export default profile
