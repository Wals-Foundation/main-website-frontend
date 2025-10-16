"use client"

import React from "react"

const Modal: React.FC<{
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto
                   w-full sm:w-auto sm:max-w-[90vw]"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
