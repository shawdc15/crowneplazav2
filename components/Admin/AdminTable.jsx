import React, { useRef, useState } from 'react'
import moment from 'moment'
import { UpdateSvg } from '../Svg'
import { useAppContext } from '../../context/AppContext'
import { MenuSvg, DeleteSvg } from '../Svg'
import { adminSearches } from '../../services/admin.services'
import AdminModalManager from '../Modal/AdminModalManager'
const AdminTable = ({
  data_items,
  data_headers,
  modalType,
  title,
  setNav,
  nav,
  searchKey,
}) => {
  const { state, dispatch } = useAppContext()
  const [modal, setModal] = useState(false)
  const modeRef = useRef()
  const [search, setSearch] = useState('')
  // const [data, setData] = useState(data_items)
  const updateHandler = (value) => {
    dispatch({ type: 'ADMIN_MODAL_DATA', value: value })
    modeRef.current = 'edit'
    setModal(true)
  }
  const addHandler = () => {
    dispatch({ type: 'ADMIN_MODAL_DATA', value: null })
    modeRef.current = 'add'
    setModal(true)
  }
  const viewing = [
    'Reservation Reports',
    'Payment Reports',
    'Cancellation Reports',
    'Guests',
    'Room Reports',
    'Cleaner Reports',
    'Task Reports',
  ]
  const formatTotal = (x) => {
    if (x != undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
  const searchHandler = (e) => {
    setSearch(e.target.value)
  }
  const filteredData = data_items?.filter((item) =>
    item[searchKey]?.includes(search)
  )
  return (
    <>
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
            onChange={searchHandler}
            className="my-2 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Search here"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-semibold">{title}</p>
          {!viewing.includes(modalType) && (
            <button
              onClick={addHandler}
              className="my-2 rounded-md bg-slate-900 px-4 py-2 text-slate-300 hover:text-white"
            >
              Add
            </button>
          )}
        </div>
      </div>
      <div className="w-full overflow-auto">
        {modal && (
          <AdminModalManager
            setModal={setModal}
            mode={modeRef.current}
            modalType={modalType}
          />
        )}
        <table className="mt-4 w-full table-auto text-sm">
          <thead>
            <tr className="e bg-slate-800">
              {data_headers &&
                data_headers.map(({ name }, index) => (
                  <th className="p-2  text-left text-white" key={index}>
                    {name}
                  </th>
                ))}
              {!viewing.includes(modalType) && (
                <th className="p-2 text-center text-white" colSpan={2}>
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((item, index) => (
                <tr key={index}>
                  {data_headers &&
                    data_headers.map(({ key }, sub_index) => (
                      <td
                        className={`border-2 border-slate-100 px-3 text-slate-600 ${
                          key == 'statusofemployment' || key == 'shift'
                            ? 'capitalize'
                            : ''
                        }`}
                        key={sub_index}
                      >
                        {/* {key == 'total' && 'asd'} */}
                        {key == 'name'
                          ? `${item['firstName']} ${item['lastName']}`
                          : key == 'total' || key == 'price'
                          ? formatTotal(item[key])
                          : ['checkIn', 'checkOut'].includes(key)
                          ? moment(item[key]).format('MM/DD/YYYY')
                          : key == 'roomNo'
                          ? item[key]?.join(',')
                          : key == 'customerName'
                          ? item['name']
                          : key == 'date' || key == 'created_at'
                          ? moment(item[key]).format('YYYY-MM-DD')
                          : item[key]}
                      </td>
                    ))}
                  {!viewing.includes(modalType) && (
                    <td className="border-2 border-slate-100 p-2 text-center text-slate-600">
                      <button
                        onClick={() => updateHandler(item)}
                        className="rounded-md bg-slate-200 p-2 text-center transition-colors hover:bg-slate-300"
                      >
                        <UpdateSvg />
                      </button>
                    </td>
                  )}
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
    </>
  )
}

export default AdminTable
