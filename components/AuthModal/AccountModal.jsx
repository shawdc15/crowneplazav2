import React from 'react'
import Link from 'next/link'
import { useAppContext } from '../../context/AppContext'
import { authLogout } from '../../services/user.services'
import { useRouter } from 'next/router'

const AccountModal = ({ active, modal }) => {
  const { state, dispatch } = useAppContext()
  const router = useRouter()

  const logoutHandler = async () => {
    const res = await authLogout()
    if (res.success) {
      dispatch({ type: 'LOGOUT' })
      modal(false)
      router.push('/')
    }
  }
  return state?.profileModalStatus ? (
    <div className="rounded-md border bg-white py-2 shadow-md lg:absolute lg:top-11 lg:right-0">
      <div className="flex flex-col">
        {active == 'reservation' ? (
          <p
            onClick={() => modal(false)}
            className=" cursor-pointer px-6 py-3 text-2xl font-semibold text-slate-300 transition-colors duration-300 hover:text-emerald-500 lg:text-sm lg:text-slate-800"
          >
            Reservation History
          </p>
        ) : (
          <Link href="/customer/reservation/">
            <p className="cursor-pointer px-6 py-3 text-left text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:w-auto lg:text-sm">
              Reservation History
            </p>
          </Link>
        )}
        {active == 'profile' ? (
          <p
            onClick={() => modal(false)}
            className=" cursor-pointer px-6 py-3 text-2xl font-semibold text-slate-300 transition-colors duration-300 hover:text-emerald-500 lg:text-sm lg:text-slate-800"
          >
            Settings
          </p>
        ) : (
          <Link href="/customer/settings/profile">
            <p className="cursor-pointer px-6 py-3 text-left text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:w-auto lg:text-sm">
              Settings
            </p>
          </Link>
        )}

        <button
          onClick={logoutHandler}
          className="cursor-pointer px-6 py-3 text-left text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:w-auto lg:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default AccountModal
