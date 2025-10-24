"use client"

import React from "react"
import { useRouter } from 'next/navigation'
import { FilledButton, IconButton } from "./Button"
import Icon from "./Icon"
import CloseIcon from "@/src/assets/icons/close.svg"


const Modal: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-backgroundModal">
      <div
        className="mx-horizontal bg-background rounded-lg shadow-lg max-h-[90vh]
                   w-full sm:w-auto sm:max-w-[90vw]">
        {children}
        <div className="mr-4 mb-4 flex justify-end">
          <FilledButton
            title="Close"
            onClick={() => {
              router.back()
            }} />
        </div>
      </div>
    </div>
  )
}

export default Modal

export const ModalCloseButton: React.FC<{
  className?: string
  label?: string
}> = ({ className, label }) => {
  const router = useRouter()

  return (
    <IconButton
      className={className}
      icon={<Icon><CloseIcon /></Icon>}
      ariaLabel={label ?? "Close"}
      onClick={() => {
        router.back()
      }}
    />
  )
}


