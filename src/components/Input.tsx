"use client"

import React, { forwardRef } from "react";

export const TextInput = forwardRef<HTMLInputElement, {
  className?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  isInvalid?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}>(
  (
    {
      className,
      value,
      placeholder = "",
      name,
      type = "text",
      isInvalid = false,
      required = false,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`
        w-full 
        rounded-lg 
        border 
        px py
        text-base leading-6 sm:leading-7 
        focus:outline-none
        ${isInvalid ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"}
        hover:border-primary 
        ${className ?? ""}
      `}
      />
    );
  }
);

TextInput.displayName = "TextInput";