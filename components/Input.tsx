import React, { ReactNode } from "react"

interface InputProps {
  name?: string
  className?: string
  type?: string
  placeholder?: string
  image?: ReactNode
  onClickOnIcon?: () => void
  required?: boolean
}

const Input: React.FC<InputProps> = (props) => {
  const { name, type, image, placeholder, className, required, onClickOnIcon } = props

  return (
    <div className="relative">
      {image && (
        <div className="absolute inset-y-0 end-0 flex items-center pr-3.5 cursor-pointer" onClick={onClickOnIcon}>
          {image}
        </div>
      )}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={`${className || "rounded-lg"} bg-white w-full border px-6 py-4`}
          rows={10}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type || "text"}
          id={name}
          name={name}
          className={`${className || "rounded-lg"} bg-white w-full border px-6 py-4`}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  )
}

export default Input
