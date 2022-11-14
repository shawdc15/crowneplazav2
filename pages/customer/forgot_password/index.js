import React, { useState, useRef } from 'react'
import Link from 'next/link'
import {
  validateEmail,
  sendPasswordLink,
} from '../../../services/user.services'
const forgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState([])
  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    setError([])
    if (email.length == 0) {
      setError(['Please enter valid email'])
    } else {
      const result = await validateEmail(email)
      console.log(result)
      if (!result.success) {
        setError(['Email is not registered yet.'])
      } else {
        const newData = {
          email: email,
          subject: 'reset_password',
          fullname: `${result.data[0].firstName} ${result.data[0].lastName}`,
          link: `https://crowne-plaza.herokuapp.com/customer/forgot_password/${result.data[0]._id}`,
        }
        const request = await sendPasswordLink(newData)
        // console.log(request)
        if (request.success) {
          console.log(request.success)
          setSubmit(true)
        } else {
          setError(['Something went wrong'])
        }
        setError([])
      }
    }
    setIsLoading(false)
  }
  const header = () => {
    return (
      <div>
        <Link href="/customer">
          <p className="m-4 cursor-pointer border-b-4 border-emerald-400 text-center text-2xl font-bold">
            Crowné Plaza
          </p>
        </Link>
      </div>
    )
  }
  return (
    <div className="flex-column flex h-screen items-center justify-center">
      {!submit ? (
        <div className="max-w-cardMd  rounded-lg border border-slate-300 p-6">
          {header()}
          <p className="py-4 text-center text-2xl font-semibold">
            Forgot Password
          </p>
          {error.length > 0 && <p className=" text-rose-500">{error[0]}</p>}
          <p>Email Address</p>
          <form onSubmit={submitHandler}>
            <input
              className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isLoading ? (
              <button className="my-2 w-full rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white">
                Continue
              </button>
            ) : (
              <p className="my-2 w-full rounded-md bg-slate-900 px-4 py-4 text-center text-slate-300 hover:text-white">
                ...
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="max-w-cardMd  rounded-lg border border-slate-300 p-6">
          {header()}
          <p className="py-4 text-center text-2xl font-semibold">
            You requested to change your password.
          </p>
          <p className="p-2 text-center">
            Please check and click the link in your provided email.
          </p>
          <Link href="/customer">
            <p className="my-2 w-full cursor-pointer rounded-md bg-slate-900 px-4 py-4 text-center text-slate-300 hover:text-white">
              Return to homepage
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default forgotPassword
