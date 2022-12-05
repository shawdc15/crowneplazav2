import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/AppContext'
import { authStaffLogin } from '../../services/staff.services'
const Auth = () => {
  const { state, dispatch } = useAppContext()
  const { isLoading, error } = state
  const emailRef = useRef()
  const router = useRouter()
  const passwordRef = useRef()
  const loginHandler = async (e) => {
    dispatch({ type: 'LOGIN_REQUEST' })
    e.preventDefault()

    console.log('working')
    const newData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setTimeout(async () => {
      // const { username, password } = newData
      const res = await authStaffLogin(newData)
      console.log(res)
      if (res?.errors) {
        dispatch({ type: 'LOGIN_ERROR', value: { ...res.errors } })
      } else {
        let role = res.data.role

        if (role == 'receptionists') {
          dispatch({ type: 'LOGIN_SUCCESS', value: { ...res?.data } })
          router.push('/receptionist/book')
        } else if (role == 'manager') {
          router.push('/manager/rooms')
          dispatch({ type: 'LOGIN_SUCCESS', value: { ...res?.data } })
        } else if (role == 'housekeeping') {
          router.push('/housekeeping/rooms')
          dispatch({ type: 'LOGIN_SUCCESS', value: { ...res?.data } })
        } else if (role == 'administrator') {
          router.push('/admin')
          dispatch({ type: 'LOGIN_SUCCESS', value: { ...res?.data } })
        } else {
          dispatch({
            type: 'LOGIN_ERROR',
            value: { emailError: 'Wrong password or email!' },
          })
        }
      }
    }, 1000)
  }
  // const forgotHandler = () => {
  //   console.log('forgot')
  // }
  return (
    <div className="m-auto">
      <div className="flex flex-col rounded-lg border-2 p-4 ">
        <div className="min-w-card">
          <p className="m-4 cursor-pointer border-b-4 border-emerald-400 text-center text-2xl font-bold">
            Crowné Plaza
          </p>
          <p className="py-4 text-center text-2xl">Welcome Back</p>
        </div>
        <form className="flex flex-col" onSubmit={loginHandler}>
          <span className="text-rose-500">{error?.emailError}</span>
          <input
            type="email"
            ref={emailRef}
            className=" my-2 rounded-md border border-slate-300 px-4 py-3"
            placeholder="Email"
          />
          <span className="text-rose-500">{error?.passwordError}</span>
          <input
            ref={passwordRef}
            defaultValue="crowneplaza2022"
            type="password"
            className="my-2 rounded-md border border-slate-300 px-4 py-3 "
            placeholder="Password"
          />
          {/* <p
            onClick={forgotHandler}
            className="cursor-pointer py-2 text-emerald-500 underline"
          >
            Forgot Password
          </p> */}
          {!isLoading ? (
            <button
              type="submit"
              className="my-2 rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
            >
              Log In
            </button>
          ) : (
            <p
              type="submit"
              className=" my-2 rounded-md bg-slate-900 px-4 py-4 text-center text-slate-300 hover:text-white"
            >
              ...
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Auth
