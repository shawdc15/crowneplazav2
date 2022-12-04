import React, { useRef, useState } from 'react'
import { CloseSvg } from '../Svg'
import {
  authRegister,
  sendVerificationLink,
} from '../../services/user.services'
import { useAppContext } from '../../context/AppContext'
import ModalLayout from '../Layout/ModalLayout'

const Register = () => {
  const { state, dispatch } = useAppContext()
  const { error, isRegistered, isLoading } = state
  const [agree, setAgree] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const contactRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const ageRef = useRef()
  const usernameRef = useRef()

  const registerHandler = async (e) => {
    e.preventDefault()

    dispatch({ type: 'REGISTER_REQUEST' })
    if (contactRef.current.value.length != 10) {
      dispatch({
        type: 'REGISTER_ERROR',
        value: {
          ...error,
          contactError: 'Invalid Phone Number',
        },
      })
      return
    }
    if (ageRef.current.value < 18 || ageRef.current.value > 65) {
      dispatch({
        type: 'REGISTER_ERROR',
        value: {
          ...error,
          contactError: '',
          ageError: 'Age must be greater than 17 and less than 66!  ',
        },
      })
      return
    }
    const credentials = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      contact: contactRef.current.value.trim(),
      age: ageRef.current.value.trim(),
      password: passwordRef.current.value,
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }
    setTimeout(async () => {
      const res = await authRegister(credentials)
      if (res.errors) {
        dispatch({ type: 'REGISTER_ERROR', value: { ...res.errors } })
      } else {
        dispatch({ type: 'REGISTER_SUCCESS' })
        const newData = {
          fullname: `${res.data.firstName} ${res.data.lastName} `,
          link: res.data._id,
          email: res.data.email,
          subject: 'verification',
        }
        setAgree(false)
        await sendVerificationLink(newData)
      }
    }, 1000)
  }
  return (
    <>
      {state.activeModal == 'REGISTER' ? (
        <ModalLayout>
          <div>
            {!isRegistered ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="py-4 text-center text-2xl">Welcome my Guest</p>
                  <button
                    className="ml-2 p-2"
                    onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                  >
                    <CloseSvg />
                  </button>
                </div>
                <form className="flex flex-col" onSubmit={registerHandler}>
                  <div className="flex flex-col lg:flex-row lg:items-end">
                    <div className="flex w-full flex-col">
                      <span className="text-rose-500">
                        {error?.firstNameError}
                      </span>

                      <input
                        ref={firstNameRef}
                        type="text"
                        className="my-2  rounded-md border border-slate-300 px-4 py-3 lg:mr-2"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <span className="text-rose-500">
                        {error?.lastNameError}
                      </span>

                      <input
                        ref={lastNameRef}
                        type="text"
                        className="my-2  rounded-md border border-slate-300 px-4 py-3 lg:ml-2"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <span className="text-rose-500">{error?.emailError}</span>

                  <input
                    ref={emailRef}
                    type="text"
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Email"
                  />
                  <span className="text-rose-500">{error?.usernameError}</span>

                  <input
                    ref={usernameRef}
                    type="text"
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Username"
                  />
                  <div className="flex flex-col lg:flex-row lg:items-end">
                    <div className="flex w-full flex-col">
                      <span className="text-rose-500">{error?.ageError}</span>

                      <input
                        ref={ageRef}
                        type="number"
                        className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 lg:mr-2"
                        placeholder="Age"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <span className="text-rose-500">
                        {error?.contactError}
                      </span>
                      <div className="relative flex items-center ">
                        <span className="absolute left-4">+63</span>
                        <input
                          id="fix"
                          ref={contactRef}
                          type="number"
                          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3 pl-12 lg:ml-2"
                          placeholder="Contact Number"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-rose-500">{error?.passwordError}</span>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Password"
                  />
                  <span className="text-rose-500">
                    {error?.confirmPasswordError}
                  </span>
                  <input
                    type="password"
                    ref={confirmPasswordRef}
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Confirm Password"
                  />
                  <p className="bg-slate-100 p-4">
                    <input
                      onChange={() => setAgree(!agree)}
                      type="checkbox"
                      className="mr-2"
                      id="agree"
                    />
                    <label for="agree">
                      Click here to indicate that you have read and agree to the{' '}
                      <a
                        target="_blank"
                        className="text-emerald-500 underline"
                        href="/terms-and-agreement.pdf"
                      >
                        Terms and conditions
                      </a>
                    </label>
                  </p>
                  {agree ? (
                    <>
                      {!isLoading ? (
                        <button
                          type="submit"
                          className="my-2 rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
                        >
                          Register
                        </button>
                      ) : (
                        <p
                          type="submit"
                          className=" my-2 rounded-md bg-slate-900 px-4 py-4 text-center text-slate-300 hover:text-white"
                        >
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      className="my-2 cursor-default rounded-md bg-slate-500 px-4 py-4 text-slate-300"
                    >
                      Register
                    </button>
                  )}
                </form>

                <p>
                  Already had an account?{' '}
                  <button
                    className="cursor-pointer py-2 text-emerald-500 underline"
                    onClick={() => {
                      dispatch({ type: 'OPEN_LOGIN_MODAL' })
                    }}
                  >
                    Click to Log In
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <p className="py-4 text-center text-xl">
                    Registered Successfully, We sent a confimation link to your
                    email to verify your account.
                  </p>
                  <button
                    className="ml-2 p-2"
                    onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                  >
                    <CloseSvg />
                  </button>
                </div>
                <button
                  className="my-2 w-full rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
                  onClick={() => dispatch({ type: 'OPEN_LOGIN_MODAL' })}
                >
                  Continue Login
                </button>
              </div>
            )}
          </div>
        </ModalLayout>
      ) : (
        <></>
      )}
    </>
  )
}

export default Register
