import React from 'react'

const ModalLayout = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="max-h-imageLg max-w-modal overflow-y-auto rounded-lg bg-white p-4 py-6 px-7 transition duration-500">
        {children}
      </div>
    </div>
  )
}

export default ModalLayout
