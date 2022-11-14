import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import { AdminMain, AdminSidebar } from '../../components'
import { getAllCalendar } from '../../services/calendar.services'
import moment from 'moment'
import { MenuSvg } from '../../components/Svg'

const TaskReports = () => {
  const [data, setData] = useState()
  useEffect(async () => {
    const { success, data } = await getAllCalendar()
    if (success) {
      setData(data)
    }
  }, [])
  const noStatus = ['_id', 'date', 'cleaner', 'roomNo', 'verifiedBy']
  const data_headers = [
    {
      name: 'ID No#',
      key: '_id',
    },
    {
      name: 'Date',
      key: 'date',
    },
    {
      name: 'Cleaner',
      key: 'cleaner',
    },
    {
      name: 'Room No',
      key: 'roomNo',
    },
    {
      name: 'Verified By',
      key: 'verifiedBy',
    },
    { name: 'Clean Bedroom', key: 'cleanBedroom' },
    { name: 'Clean Toilet', key: 'cleanToilet' },
    { name: 'Clean Windows', key: 'cleanWindows' },
    { name: 'Clean Fridge', key: 'cleanFridge' },
    { name: 'Clean Furnitures', key: 'cleanFurnitures' },
    { name: 'Clean Bathtub', key: 'cleanBathtub' },
    { name: 'Sweep Floor', key: 'sweepFloor' },
    { name: 'Mop Floor', key: 'mopFloor' },
    { name: 'Empty Trash', key: 'emptyTrash' },
    { name: 'Change Bedsheets', key: 'changeBedsheets' },
    { name: 'Change Pillowcase', key: 'changePillowCase' },
    { name: 'Change Blanket', key: 'changeBlankets' },
    { name: 'Change Towels', key: 'changeTowels' },
    { name: 'Change Trashbags', key: 'changeTrashBags' },
    { name: 'Replace Toiletries', key: 'replaceToiletries' },
    { name: 'Replace Rugs', key: 'replaceRugs' },
    { name: 'Others 1', key: 'others1' },
    { name: 'Others 2', key: 'others2' },
    { name: 'Others 3', key: 'others3' },
  ]
  const [search, setSearch] = useState('')
  const [nav, setNav] = useState(false)
  const filteredData = data?.filter((item) => item['cleaner']?.includes(search))
  return (
    <>
      <Head>
        <title>Task Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`flex min-h-screen ${nav ? 'overflow-hidden' : ''}`}>
        <AdminSidebar nav={nav} />
        <div className="w-full overflow-auto p-4 lg:p-10">
          <div className="sticky left-0">
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
                onChange={(e) => setSearch(e.target.value)}
                className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
                type="text"
                placeholder="Search here"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-2xl font-semibold">Task Reports</p>
            </div>
          </div>
          <table className="mt-4 w-full table-auto text-sm">
            <thead>
              <tr className="e bg-slate-800">
                {data_headers &&
                  data_headers.map(({ name }, index) => (
                    <th className="p-2  text-left text-white" key={index}>
                      {name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((item, index) => (
                  <tr key={index}>
                    {data_headers &&
                      data_headers.map(({ key }, sub_index) => (
                        <td
                          className="border-2 border-slate-100 px-3 text-slate-600"
                          key={sub_index}
                        >
                          {key == 'date'
                            ? moment(item[key]).format('YYYY-MM-DD')
                            : noStatus.includes(key)
                            ? item[key]
                            : `Status: \n${
                                item[key]?.taskStatus || ''
                              } \nNote:\n${item[key]?.notes || ''}`}
                        </td>
                      ))}
                  </tr>
                ))}
              {filteredData?.length == 0 && (
                <tr>
                  <td
                    colSpan={data_headers.length + 1}
                    className="border-2 border-slate-100 px-3 text-center text-slate-600"
                  >
                    {' '}
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TaskReports
