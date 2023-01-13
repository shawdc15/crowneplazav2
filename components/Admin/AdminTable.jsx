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
  filteredButtons
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
  const filteredData = ()=>{
    if(title=="Reservation Reports"){
      return data_items?.filter((item) =>
       item["status"]==filteredButtons[0].getter && item[searchKey]?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
      )
    }
    else if(title == "Payment Reports"){
      return data_items?.filter((item) =>
      item["roomType"]==filteredButtons[0].getter && item[searchKey]?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
     )
    }
    else if(title == "Cancellation Reports"){
      return data_items?.filter((item) =>
      item["roomType"]==filteredButtons[1].getter && item["reason"]==filteredButtons[0].getter && item[searchKey]?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
     )
    }
    else if(title == "Cleaner Reports"){
      return data_items?.filter((item) =>
      item["roomStatus"]==filteredButtons[2].getter && item["reservationStatus"]==filteredButtons[1].getter && item["cleaner"]==filteredButtons[0].getter && item[searchKey]?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
     )
    }
    else{
      return data_items?.filter((item) =>
      item[searchKey]?.toString()?.toLowerCase()?.includes(search?.toLowerCase() )
      )
    }
  }
  console.log(filteredData())
  const downloadFile = () => {
    let newArr = null

    switch (title) {
      case 'Payment Reports':
        newArr = data_items.map(
          ({ paymentMethod, gcashNumber, reservation_id, _v, ...rest }) => {
            return {
              'ID No#.': reservation_id,
              'Reference No.': rest._id,
              Name: rest.receiptFor,
              Channel: rest.channel,
              'Room No': rest.preferredRoom,
              'Room Type': rest.roomType,
              Amount: rest.total,
              // 'Payment Status': rest.status,
              'Date Of Payment': moment(rest.created_at).format(
                'MMM DD, YYYY hh:mm:ss A'
              ),
            }
          }
        )
        break
      case 'Reservation Reports':
        newArr = data_items.map(
          ({
            _id,
            name,
            checkIn,
            checkOut,
            roomType,
            preferredRoom,
            noOfExtraBed,
            status,
          }) => {
            return {
              'ID No#.': _id,
              Name: name,
              'Check-In': moment(checkIn).format('MMM DD YYYY hh:mm:ss A'),
              'Check-Out': moment(checkOut).format('MMM DD YYYY hh:mm:ss A'),
              'Room Type': roomType,
              'Room No#': preferredRoom,
              'Extra Beds': noOfExtraBed,
              Status: status.toUpperCase(),
            }
          }
        )
        break
      case 'Cancellation Reports':
        newArr = data_items.map(
          ({
            reservation_id,
            _id,
            receiptFor,
            channel,
            preferredRoom,
            roomType,
            total,
            reason,
            created_at,
          }) => {
            return {
              'ID No#': reservation_id,
              'Reference No.': _id,
              Name: receiptFor,
              Channel: channel,
              'Room No#': preferredRoom,
              'Room Type': roomType,
              Amount: total,
              Reason: reason,
              'Date Of Payment': moment(created_at).format(
                'MMM DD, YYYY hh:mm:ss A'
              ),
            }
          }
        )
        break
      case 'Room Reports':
        newArr = data_items.map(
          ({
            _id,
            date,
            preferredRoom,
            roomType,
            reservationStatus,
            roomStatus,
          }) => {
            return {
              'ID No#': _id,
              Date: moment(date).format('MMM DD, YYYY hh:mm:ss A'),
              'Room No#': preferredRoom,
              'Room Type': roomType,
              'Room Status': roomStatus,
              'Reservation Status': reservationStatus,
            }
          }
        )
        break
      case 'Cleaner Reports':
        newArr = data_items.map(
          ({
            _id,
            date,
            cleaner,
            verifiedBy,
            reservationStatus,
            roomStatus,
          }) => {
            return {
              'ID No#': _id,
              Date: moment(date).format('MMM DD, YYYY hh:mm:ss A'),
              Cleaner: cleaner,
              'Verified By': verifiedBy,
              'Reservation Status': reservationStatus,
              'Room Status': roomStatus,
            }
          }
        )
        break
      default:
        return
    }
    var myFile = `${title?.toLowerCase().replace(' ', '_')}_${moment().format(
      'YYYY-MM-DD hh:mm:ss'
    )}.xlsx`
    var myWorkSheet = XLSX.utils.json_to_sheet(newArr)
    var myWorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, 'myWorkSheet')
    XLSX.writeFile(myWorkBook, myFile)
  }
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
            placeholder={searchKey == "_id" ? "Search  ID No#" : "Search " + searchKey?.toLowerCase().replace("_"," ")}
          />
        </div>
      {  filteredButtons && (

        <div className='flex gap-4'>
          {filteredButtons.map(({setter,choices,key},index)=>(
            <div key={index} className="flex flex-col">
              <label className='text-sm font-semibold'>{key.toUpperCase()}</label>
            <select  className="my-2 w-full rounded-md border border-slate-300 px-3 py-2" onChange={(e)=>setter(e.target.value)}>
              <option defaultValue>-----</option>
            {choices?.map((item,innerIndex)=>(
              <option value={item} key={innerIndex}>{item}</option>
              ))}
            </select>
              </div>
          ))}
        </div>
          )}
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-semibold">{title}</p>
          <div>
            {data_items &&
              [
                'Payment Reports',
                'Cancellation Reports',
                'Reservation Reports',
                'Room Reports',
                'Cleaner Reports',
              ].includes(title) && (
                <button
                  onClick={() => downloadFile()}
                  className="rounded-md bg-violet-500 px-4 py-2 text-white"
                >
                  Download as Excel
                </button>
              )}
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
            {filteredData() &&
              filteredData().map((item, index) => (
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
                          ? `${item['firstName']||""} ${item['lastName']||""}`
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
                          : key == 'contact'
                          ? '(+63)' + (item[key]||"")
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
            {filteredData()?.length == 0 && (
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
