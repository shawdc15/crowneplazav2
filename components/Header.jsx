import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { MenuSvg, CloseSvg } from './Svg'
import { getUser } from '../services/user.services'
import { useAppContext } from '../context/AppContext'
import { Login, Register, AccountModal } from '../components'
const Header = ({ active }) => {
  const { state, dispatch } = useAppContext()
  const [menuSidebarStatus, setMenuSidebarStatus] = useState(false)
  const links = [
    {
      name: 'Home',
      link: '/customer',
      defaultActive: 'home',
    },
    {
      name: 'Accommodation',
      link: '/customer/accommodation',
      defaultActive: 'accomodation',
    },
    {
      name: 'FAQs',
      link: '/customer/faqs',
      defaultActive: 'faqs',
    },
  ]

  const mounted = useRef()
  useEffect(() => {
    const load = async () => {
      const res = await getUser()
      if (
        JSON.stringify(state.user) != JSON.stringify(res.data) &&
        res.success
      ) {
        // console.log('set cache')
        dispatch({ type: 'SET_USER', value: res.data })
      }
      mounted.current = true
    }
    if (!mounted.current) {
      load()
    }
  })

  return (
    <div className=" sticky top-0 z-10 flex items-center justify-between bg-white px-2">
      <div>
        <Link href="/customer">
          <p className="m-4 cursor-pointer border-b-4 border-emerald-400 text-2xl font-bold">
            Crowné Plaza
          </p>
        </Link>
      </div>
      <div
        onClick={() => setMenuSidebarStatus(!menuSidebarStatus)}
        className="cursor-pointer p-2 transition-opacity duration-100 hover:opacity-75 lg:hidden"
      >
        <MenuSvg />
      </div>
      <div
        className={`${
          menuSidebarStatus
            ? 'fixed top-0 left-0 z-50 block h-screen w-screen flex-col bg-slate-900'
            : 'hidden'
        } items-center lg:relative lg:flex lg:h-auto lg:w-auto lg:flex-row lg:bg-transparent`}
      >
        {menuSidebarStatus && (
          <div className="flex items-center justify-between px-14 pt-10 text-slate-200 lg:hidden">
            <p className="border-b-4 border-emerald-400 text-2xl font-bold">
              Crowné Plaza
            </p>
            <button onClick={() => setMenuSidebarStatus(false)}>
              <CloseSvg color="white" />
            </button>
          </div>
        )}
        <ul
          className={` flex flex-col p-10 lg:flex-row lg:items-center lg:p-0`}
        >
          {links.map(({ name, link, defaultActive }, index) => (
            <li key={index}>
              {active != defaultActive ? (
                <Link className="" href={link}>
                  <p className=" cursor-pointer px-4 py-3 text-2xl font-semibold text-slate-300 transition-colors duration-300 hover:text-emerald-500 lg:text-sm lg:text-slate-800">
                    {name}
                  </p>
                </Link>
              ) : (
                <p
                  onClick={() => setMenuSidebarStatus(false)}
                  className=" cursor-pointer px-4 py-3 text-2xl font-semibold text-slate-300 transition-colors duration-300 hover:text-emerald-500 lg:text-sm lg:text-slate-800"
                >
                  {name}
                </p>
              )}
            </li>
          ))}
        </ul>
        {!state?.isAuth ? (
          <div className="flex-col px-10 text-slate-300 lg:ml-4 lg:flex lg:flex-row lg:items-center lg:p-0 lg:text-slate-800">
            <button
              onClick={() => {
                dispatch({ type: 'OPEN_LOGIN_MODAL' })
                setMenuSidebarStatus(false)
              }}
              className="w-full px-4 py-3 text-left text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:w-auto lg:text-sm"
            >
              Login
            </button>
            <span className="hidden lg:block">|</span>
            <button
              onClick={() => {
                dispatch({ type: 'OPEN_REGISTER_MODAL' })
                setMenuSidebarStatus(false)
              }}
              className="w-full px-4 py-3 text-left text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:w-auto lg:text-sm"
            >
              Register
            </button>
          </div>
        ) : (
          <div
            onMouseLeave={() =>
              dispatch({ type: 'SWITCH_PROFILE_MODAL_STATUS' })
            }
            onMouseEnter={() =>
              dispatch({ type: 'SWITCH_PROFILE_MODAL_STATUS' })
            }
            className="flex-col px-10 text-slate-300 lg:ml-4 lg:flex lg:flex-row lg:items-center lg:p-0 lg:text-slate-800"
          >
            <button className="w-full px-4 py-3 text-left text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:w-auto lg:text-sm">
              Profile
            </button>{' '}
            <AccountModal active={active} modal={setMenuSidebarStatus} />
          </div>
        )}
      </div>
      {/* Auth Modal  */}
      <Login />
      <Register />
    </div>
  )
}

export default Header
