import React from 'react'
import Link from 'next/link'
import { ProfileSvg, PasswordSvg, HelpSvg } from '../Svg'
const Sidebar = () => {
  return (
    <div className="flex min-w-max rounded-md bg-slate-900 py-2 shadow-md">
      <ul className="w-full">
        <li>
          <Link href="/customer/settings/profile">
            <p className="flex w-full cursor-pointer gap-2 px-9 py-4 text-white transition-colors delay-75 hover:text-emerald-500">
              <ProfileSvg /> Profile
            </p>
          </Link>
        </li>
        <li>
          <Link href="/customer/settings/password">
            <p className="flex w-full cursor-pointer gap-2 px-9 py-4 text-white transition-colors delay-75 hover:text-emerald-500 ">
              <PasswordSvg /> Password
            </p>
          </Link>
        </li>
        <li>
          <Link href="/customer/settings/help">
            <p className="flex w-full cursor-pointer gap-2 px-9 py-4 text-white transition-colors delay-75 hover:text-emerald-500">
              <HelpSvg /> Help
            </p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
