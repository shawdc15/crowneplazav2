import React from 'react'
import {
  VoucherModal,
  GuestModal,
  ManagerModal,
  OtherStaffModal,
  SupervisorModal,
  RoomModal,
} from '../../components'

const AdminModalManager = ({ modalType, setModal, mode }) => {
  const modal = () => {
    switch (modalType) {
      case 'Voucher':
        return <VoucherModal setModal={setModal} mode={mode} />
      case 'Guests':
        return <GuestModal setModal={setModal} mode={mode} />
      case 'Manager':
        return <ManagerModal setModal={setModal} mode={mode} />
      case 'HK Supervisor':
        return <SupervisorModal setModal={setModal} mode={mode} />
      case 'Rooms':
        return <RoomModal setModal={setModal} mode={mode} />
      case 'Receptionists':
      case 'Guest Attendants':
      case 'Cleaners':
      case 'Guards':
      case 'Administrator':
        return (
          <OtherStaffModal
            setModal={setModal}
            mode={mode}
            role={modalType.toLowerCase()}
          />
        )

      default:
        return false
    }
  }
  return <>{modal()}</>
}

export default AdminModalManager
