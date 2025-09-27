import React from "react"

export const FilledButton: React.FC<{
  className?: string,
  title: string,
  type?: "submit" | "reset" | "button" | undefined,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({ className, title, type, style, onClick }) => {
  return (
    <button
      className={`interactive px py font-semibold sentence-case rounded-full align-middle bg-primary line-clamp-1 text-on-primary hover:bg-primary-inverse ${className ?? ""}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export const IconButton: React.FC<{
  className?: string,
  icon: React.ReactNode,
  type?: "submit" | "reset" | "button" | undefined,
  style?: React.CSSProperties,
  ariaLabel?: string,
  onClick?: () => void
}> = ({ className, icon, type, style, ariaLabel, onClick }) => {
  return (
    <button
      className={`interactive px py flex justify-center align-middle rounded-full hover:bg-primary-inverse ${className ?? ""}`}
      type={type}
      style={style}
      onClick={onClick}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {icon}
    </button>
  );
};

export const OutlinedButton: React.FC<{
  className?: string,
  title: string,
  type?: "submit" | "reset" | "button" | undefined,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({ className, title, type, style, onClick }) => {
  return (
    <button
      className={`interactive px py sentence-case rounded-full text-primary hover:bg-primary-inverse 
  flex items-center justify-center truncate ${className ?? ""}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export const TonalButton: React.FC<{
  className?: string,
  title: string,
  type?: "submit" | "reset" | "button" | undefined,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({ className, title, type, style, onClick }) => {
  return (
    <button
      className={`interactive px py font-semibold sentence-case rounded-full align-middle bg-secondary line-clamp-1 text-primary hover:bg-primary-inverse ${className ?? ""}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

interface ButtonProps {
  title?: string
  loading?: boolean
  onClick?: () => void
  theme?: "primary" | "secondary" | "border"
  type?: "submit" | "reset" | "button" | undefined
  className?: string
}
// /filled/outlined/text, enabled/disabled
const buttonStyle = (enabled: boolean, theme?: "primary" | "secondary" | "border"): string => {
  const filledButtonStyle = "bg-primary text-on-primary hover:bg-primary-inverse"
  const filledButtonDisabledStyle = "bg-btn-disabled text-btn-disabled-text"
  const outlinedButtonStyle = "border-2 border-primary text-primary"
  const outlinedButtonDisabledStyle = "border-2 border-btn-disabled text-btn-disabled-text"
  const textButtonStyle = "bg-secondary text-primary"
  const textButtonDisabledStyle = "bg-btn-disabled text-btn-disabled-text"

  switch (theme) {
    case "border":
      if (enabled)
        return outlinedButtonStyle
      else
        return outlinedButtonDisabledStyle
    case "secondary":
      if (enabled)
        return textButtonStyle
      else
        return textButtonDisabledStyle
    default:
      if (enabled)
        return filledButtonStyle
      else
        return filledButtonDisabledStyle
  }
}
const Button: React.FC<ButtonProps> = (props) => {
  const { title, loading, onClick, type, theme, className } = props
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`h-interactive w-full sm:w-fit px-6 rounded-full font-size-bold align-middle
           whitespace-nowrap ${buttonStyle(true, theme)}  ${!!className ? className : ""}`}
      >
        {loading && (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
        )}
        <span>{!loading ? title || "Submit" : ""}</span>
      </button>
    </>
  )
}

export default Button
