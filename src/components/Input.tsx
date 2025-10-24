import React, { ReactNode } from "react"

interface InputProps {
  name?: string
  value?: string
  className?: string
  type?: string
  placeholder?: string
  image?: ReactNode
  onClickOnIcon?: () => void
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  required?: boolean
}

const Input: React.FC<InputProps> = (props) => {
  const { name, type, image, placeholder, className, value, required, onChange, onClickOnIcon } = props

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
          onChange={onChange}
        />
      ) : (
        <input
          type={type || "text"}
          id={name}
          name={name}
          value={value}
          className={`${className || "rounded-lg"} bg-white w-full border px-6 py-4`}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      )}
    </div>
  )
}

export default Input
