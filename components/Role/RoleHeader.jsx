import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MenuSvg, CloseSvg } from '../Svg'
import { useAppContext } from '../../context/AppContext'
import NavItems from './NavItems'
const RoleHeader = ({ active, role }) => {
  const { state, dispatch } = useAppContext()
  const [menuSidebarStatus, setMenuSidebarStatus] = useState(false)
  const receptionist_links = [
    {
      name: 'Book',
      link: '/receptionist/book',
      defaultActive: 'book',
    },
    {
      name: 'Reserved List',
      link: '/receptionist/reserved_list',
      defaultActive: 'reserved',
    },
    {
      name: 'Reserved Status',
      link: '/receptionist/reservation_status',
      defaultActive: 'reservation',
    },
    // {
    //   name: 'Requested List',
    //   link: '/receptionist/requested_list',
    //   defaultActive: 'requested',
    // },
  ]
  const housekeeping_links = [
    {
      name: 'Rooms',
      link: '/housekeeping/rooms',
      defaultActive: 'room',
    },
    {
      name: 'Housekeeping',
      link: '/housekeeping/housekeepings',
      defaultActive: 'housekeepings',
    },
    {
      name: 'Calendar',
      link: '/housekeeping/calendar',
      defaultActive: 'calendar',
    },
  ]
  const manager_links = [
    {
      name: 'Rooms',
      link: '/manager/rooms',
      defaultActive: 'room',
    },
    {
      name: 'Reserved List',
      link: '/manager/reserved_list',
      defaultActive: 'reserved',
    },
    {
      name: 'Requested Rooms',
      link: '/manager/requested_list',
      defaultActive: 'requested',
    },
    {
      name: 'Cancelled List',
      link: '/manager/cancelled_list',
      defaultActive: 'cancelled',
    },
    {
      name: 'Housekeeping',
      link: '/manager/housekeepings',
      defaultActive: 'housekeepings',
    },
    {
      name: 'Calendar',
      link: '/manager/calendar',
      defaultActive: 'calendar',
    },
  ]
  const mounted = useRef()

  return (
    <div className=" sticky top-0 z-10 flex items-center justify-between bg-white px-2">
      <div>
        <Link href="">
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
            ? 'fixed top-0 left-0 block h-screen w-screen flex-col bg-slate-900'
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
          {
            <NavItems
              setMenuSidebarStatus={setMenuSidebarStatus}
              active={active}
              links={
                role == 'receptionist'
                  ? receptionist_links
                  : role == 'manager'
                  ? manager_links
                  : housekeeping_links
              }
            />
          }
          <li>
            <Link href="/role">
              <button className="cursor-pointer px-4 py-3 text-2xl font-semibold text-slate-300 transition-colors duration-300 hover:text-emerald-500 lg:text-sm lg:text-slate-800">
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RoleHeader
