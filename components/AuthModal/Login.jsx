import React, { useRef } from 'react'
import { CloseSvg } from '../Svg'
import { authLogin } from '../../services/user.services'
import { useAppContext } from '../../context/AppContext'
import ModalLayout from '../Layout/ModalLayout'
import Link from 'next/link'
const Login = () => {
  const { state, dispatch } = useAppContext()
  const { error, isLoading } = state

  const usernameRef = useRef()
  const passwordRef = useRef()
  const loginHandler = async (e) => {
    dispatch({ type: 'LOGIN_REQUEST' })
    e.preventDefault()
    const credentials = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
    setTimeout(async () => {
      const { errors, data } = await authLogin(credentials)
      if (errors) {
        dispatch({ type: 'LOGIN_ERROR', value: { ...errors } })
      } else {
        dispatch({ type: 'LOGIN_SUCCESS', value: data })
      }
    }, 1000)
  }
  return (
    <>
      {state.activeModal == 'LOGIN' ? (
        <ModalLayout>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="py-4 text-center text-2xl">Welcome Back</p>
              <button
                className="ml-2 p-2"
                onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
              >
                <CloseSvg />
              </button>
            </div>
            <form className="flex flex-col" onSubmit={loginHandler}>
              <span className="text-rose-500">{error?.usernameError}</span>
              <input
                type="text"
                ref={usernameRef}
                className=" my-2 rounded-md border border-slate-300 px-4 py-3"
                placeholder="Username"
              />
              <span className="text-rose-500">{error?.passwordError}</span>
              <input
                ref={passwordRef}
                type="password"
                className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                placeholder="Password"
              />
              <Link href="/customer/forgot_password">
                <a className="cursor-pointer py-2 text-emerald-500 underline">
                  Forgot Password
                </a>
              </Link>
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
            <p>
              Don't have an account?{' '}
              <button
                className="cursor-pointer py-2 text-emerald-500 underline"
                onClick={() => {
                  dispatch({ type: 'OPEN_REGISTER_MODAL' })
                }}
              >
                Click to Register
              </button>
            </p>
          </div>
        </ModalLayout>
      ) : (
        <></>
      )}
    </>
  )
}

export default Login
