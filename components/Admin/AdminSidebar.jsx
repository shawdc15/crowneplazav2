import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { ArrowDown, ArrowUp } from '../Svg'

const AdminSidebar = ({ nav }) => {
  const router = useRouter()
  const activePage = router.asPath
  const { state, dispatch } = useAppContext()
  const { activeSidebar } = state
  const managementLinks = [
    {
      name: 'Guests',
      link: '/admin/guests',
      subItem: null,
    },
    {
      name: 'Hotel Staffs',
      link: null,
      subItem: [
        {
          name: 'Manager',
          link: '/admin/manager',
        },
        {
          name: 'Supervisor',
          link: '/admin/supervisor',
        },
        {
          name: 'Receptionists',
          link: '/admin/staff_receptionist',
        },
        {
          name: 'Guest Attendants',
          link: '/admin/guest_attendants',
        },
        {
          name: 'Housekeeping',
          link: '/admin/housekeeping',
        },
        {
          name: 'Guards',
          link: '/admin/guards',
        },
      ],
    },
    {
      name: 'Rooms',
      link: '/admin/rooms',
      subItem: null,
    },
    {
      name: 'Systems Users',
      link: null,
      subItem: [
        {
          name: 'Administrators',
          link: '/admin/administrator',
        },
        {
          name: 'Receptionists',
          link: '/admin/user_receptionists',
        },
      ],
    },
    {
      name: 'Reservation Reports',
      link: '/admin/reservation_reports',
      subItem: null,
    },
    {
      name: 'Payment Reports',
      link: '/admin/payment_reports',
      subItem: null,
    },
    {
      name: 'Cancellation Reports',
      link: '/admin/cancellation_reports',
      subItem: null,
    },
    {
      name: 'Voucher',
      link: '/admin/voucher',
      subItem: null,
    },
  ]
  const housekeeping = [
    {
      name: 'Room Reports',
      link: '/admin/room_reports',
    },
    {
      name: 'Cleaner Reports',
      link: '/admin/cleaner_reports',
    },
    {
      name: 'Task Reports',
      link: '/admin/task_reports',
    },
  ]
  return (
    <div
      className={`${
        nav ? 'translate-x-0 ' : 'hidden'
      } block min-w-card border-r-2 bg-slate-100 text-slate-800 lg:block`}
    >
      <div className=" py-6">
        <p className="m-4 cursor-pointer border-b-4 border-emerald-400 text-center text-2xl font-bold">
          Crowné Plaza
        </p>
        <span className="block w-full text-center">Hotel Address Here</span>
      </div>
      <div>
        <p className="p-4">Hotel Management</p>
        {managementLinks.map(({ name, link, subItem }, index) => (
          <div key={index}>
            {link ? (
              <Link href={link}>
                <p
                  className={`cursor-pointer py-2 px-10  text-sm transition-all hover:bg-slate-900 hover:text-white ${
                    activePage == link ? 'bg-slate-900 text-white' : ''
                  }`}
                >
                  {name}
                </p>
              </Link>
            ) : (
              <>
                <div
                  onClick={() =>
                    dispatch({
                      type: 'CHANGE_ACTIVE_SIDEBAR',
                      value: index == activeSidebar ? 0 : index,
                    })
                  }
                  className=" flex cursor-pointer justify-between py-2  px-10 transition-all hover:bg-slate-900 hover:text-white"
                >
                  <p className="text-sm">{name}</p>
                  <span>
                    {index == activeSidebar ? <ArrowUp /> : <ArrowDown />}
                  </span>
                </div>
                <div
                  className={`${
                    activeSidebar == index ? 'max-h-auto' : 'max-h-0'
                  } overflow-hidden transition-all `}
                >
                  {subItem &&
                    subItem.map(({ name, link }, itemIndex) => (
                      <Link href={link} key={itemIndex}>
                        <p
                          className={`${
                            activePage == link ? 'bg-slate-900  text-white' : ''
                          } cursor-pointer px-16 py-2 text-sm hover:bg-slate-900 hover:text-white`}
                        >
                          {name}
                        </p>
                      </Link>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
        <p className="p-4 text-sm">House Keeping</p>
        {housekeeping.map(({ name, link }, index) => (
          <Link href={link} key={index}>
            <p
              className={`cursor-pointer py-2 px-10  text-sm hover:bg-slate-900 hover:text-white ${
                activePage == link ? 'bg-slate-900 text-white' : ''
              }`}
            >
              {name}
            </p>
          </Link>
        ))}
        <Link href="/role">
          <p
            className={`cursor-pointer py-2 px-10  text-sm hover:bg-slate-900 hover:text-white`}
          >
            Logout
          </p>
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar
