import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { MenuSvg } from '../Svg'

const AdminHeader = ({ title, setNav, nav }) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-4 lg:hidden">
        <span
          onClick={() => setNav(!nav)}
          className="inline-block cursor-pointer rounded-full bg-slate-200 p-1 text-center"
        >
          <MenuSvg />
        </span>
        <div>
          <p className="border-b-4 border-emerald-400 text-lg font-bold ">
            Crowné Plaza
          </p>
        </div>
      </div>
      <div>
        <input
          className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
          type="text"
          placeholder="Search here"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-2xl font-semibold">{title}</p>
        <button
          type="submit"
          className="my-2 rounded-md bg-slate-900 px-4 py-2 text-slate-300 hover:text-white"
        >
          Add Record
        </button>
      </div>
    </div>
  )
}

export default AdminHeader
