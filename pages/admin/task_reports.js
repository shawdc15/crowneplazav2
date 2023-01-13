import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import { AdminMain, AdminSidebar } from '../../components'
import { getAllCalendar } from '../../services/calendar.services'
import moment from 'moment'
import { MenuSvg } from '../../components/Svg'
import Script from 'next/script'

const TaskReports = () => {
  const [data, setData] = useState()
  useEffect(async () => {
    const res = await getAllCalendar()
    if (res.success) {
      setData(res.data)
    }
  }, [])
  console.log(data)
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
  const downloadHandller = () => {
    const newArr = data.map(
      ({
        _id,
        date,
        cleaner,
        roomNo,
        verifiedBy,
        cleanBedroom,
        cleanToilet,
        cleanWindows,
        cleanFridge,
        cleanFurnitures,
        cleanBathtub,
        sweepFloor,
        mopFloor,
        emptyTrash,
        changeBedsheets,
        changePillowCase,
        changeBlankets,
        changeTowels,
        changeTrashBags,
        replaceToiletries,
        replaceRugs,
        others1,
        others2,
        others3,
      }) => {
        return {
          'ID No#': _id,
          Date: moment(date).format('MMM DD, YYYY hh:mm:ss A'),
          Cleaner: cleaner,
          'Room No#': roomNo,
          'Verified By': verifiedBy,
          'Clean Bedroom':
            cleanBedroom?.taskStatus || cleanBedroom?.notes || '',
          'Clean Toilet': cleanToilet?.taskStatus || cleanToilet?.notes || '',
          'Clean Windows':
            cleanWindows?.taskStatus || cleanWindows?.notes || '',
          'Clean Fridge': cleanFridge?.taskStatus || cleanFridge?.notes || '',
          'Clean Furnitures':
            cleanFurnitures?.taskStatus || cleanFurnitures?.notes || '',
          'Clean Bathtub':
            cleanBathtub?.taskStatus || cleanBathtub?.notes || '',
          'Sweep Floor': sweepFloor?.taskStatus || sweepFloor?.notes || '',
          'Mop Floor': mopFloor?.taskStatus || mopFloor?.notes || '',
          'Empty Trash': emptyTrash?.taskStatus || emptyTrash?.notes || '',
          'Change Bedsheets':
            changeBedsheets?.taskStatus || changeBedsheets?.notes || '',
          'Change Pillowcase':
            changePillowCase?.taskStatus || changePillowCase?.notes || '',
          'Change Blanket':
            changeBlankets?.taskStatus || changeBlankets?.notes || '',
          'Change Towels':
            changeTowels?.taskStatus || changeTowels?.notes || '',
          'Change Trashbags':
            changeTrashBags?.taskStatus || changeTrashBags?.notes || '',
          'Replace Toiletries':
            replaceToiletries?.taskStatus || replaceToiletries?.notes || '',
          'Replace Rugs': replaceRugs?.taskStatus || replaceRugs?.notes || '',
          'Others 1': others1?.taskStatus || others1?.notes || '',
          'Others 2': others2?.taskStatus || others2?.notes || '',
          'Others 3': others3?.taskStatus || others3?.notes || '',
        }
      }
    )
    var myFile = `task_reports_${moment().format('YYYY-MM-DD hh:mm:ss')}.xlsx`
    var myWorkSheet = XLSX.utils.json_to_sheet(newArr)
    var myWorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, 'myWorkSheet')
    XLSX.writeFile(myWorkBook, myFile)
  }
  const [search, setSearch] = useState('')
  const [nav, setNav] = useState(false)
  const filteredData = data?.filter((item) => item['cleaner'].toLowerCase()?.includes(search.toLowerCase()))
  console.log(filteredData)
  return (
    <>
      <Head>
        <title>Task Reports | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />

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
              <select>
                <option></option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-2xl font-semibold">Task Reports</p>
              <button
                onClick={() => downloadHandller()}
                className="rounded-md bg-violet-500 px-4 py-2 text-white"
              >
                Download as Excel
              </button>
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
