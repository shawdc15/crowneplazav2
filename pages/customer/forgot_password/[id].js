import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { changePassword, validateId } from '../../../services/user.services'

const forgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const [error, setError] = useState([])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const mounted = useRef()
  let id = router.query.id

  useEffect(() => {
    const load = async () => {
      const { success } = await validateId(id)
      if (id) {
        if (!success) {
          router.push('/customer')
        }
        mounted.current = true
      }
    }
    if (!mounted.current) {
      load()
    }
  })
  const submitHandler = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    let temp_error = null
    setError([])
    if (newPassword.length < 8) {
      temp_error = {
        newPasswordError: 'Password must be greater than 8 characters',
      }
    }
    if (newPassword != confirmPassword) {
      temp_error = { ...temp_error, confirmPasswordError: 'Password mismatch' }
    }
    if (!temp_error) {
      // setSubmit(true)
      const newData = {
        password: newPassword,
      }
      const result = await changePassword(id, newData)
      if (result.success) {
        setSuccess(!success)
      } else {
        temp_error = {
          newPasswordError: 'Something went wrong, Please try again',
        }
      }
    }
    setError(temp_error)
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
      {!success ? (
        <div className="max-w-cardMd rounded-lg border border-slate-300 p-6">
          {header()}
          <p className="py-4 text-center text-2xl font-semibold">
            Forgot Password
          </p>
          <form onSubmit={submitHandler}>
            {error?.newPasswordError && (
              <p className=" text-rose-500">{error?.newPasswordError}</p>
            )}
            <label htmlFor="password">New password</label>
            <input
              className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
              type="password"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />
            {error?.confirmPasswordError && (
              <p className=" text-rose-500">{error?.confirmPasswordError}</p>
            )}
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
              type="password"
              id="confirm_password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
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
        <div className=" max-w-cardMd rounded-lg border border-slate-300 p-6">
          {header()}
          <p className="py-4 text-center text-2xl font-semibold">
            Password changed successfully.
          </p>
          <p className="p-2 text-center">You may now login</p>
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
