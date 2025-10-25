import React from "react"

export const FilledButton: React.FC<{
  className?: string;
  title: string;
  type?: "submit" | "reset" | "button" | undefined;
  useSentenceCase?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}> = ({
  className,
  title,
  type,
  useSentenceCase = true,
  style,
  onClick,
  disabled = false,
}) => {
    return (
      <button
        className={`interactive px py font-semibold whitespace-nowrap ${useSentenceCase ? "sentence-case" : ""} 
        rounded-full align-middle bg-primary text-on-primary ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-inverse"} ${className ?? ""}`}
        type={type}
        style={style}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
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
  useSentenceCase?: boolean,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({ className, title, type, useSentenceCase = true, style, onClick }) => {
  return (
    <button
      className={`interactive px py ${useSentenceCase ? "sentence-case" : ""} rounded-full align-middle 
        border border-primary text-primary hover:bg-primary-inverse ${className ?? ""}`
      }
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
  useSentenceCase?: boolean,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({ className, title, type, useSentenceCase = true, style, onClick }) => {
  return (
    <button
      className={`interactive px py font-semibold ${useSentenceCase ? "sentence-case" : ""} rounded-full 
      align-middle bg-secondary text-primary hover:bg-primary-inverse ${className ?? ""}`
      }
      type={type}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};