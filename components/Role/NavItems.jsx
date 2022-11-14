import React from 'react'
import Link from 'next/link'
const NavItems = ({ links, active, setMenuSidebarStatus }) => {
  return links.map(({ name, link, defaultActive }, index) => (
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
          className={`${
            active == defaultActive
              ? 'text-emerald-500'
              : 'text-slate-300 lg:text-slate-800'
          } cursor-pointer px-4 py-3 text-2xl font-semibold  transition-colors duration-300 hover:text-emerald-500 lg:text-sm `}
        >
          {name}
        </p>
      )}
    </li>
  ))
}

export default NavItems
