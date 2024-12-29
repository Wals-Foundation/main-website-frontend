"use client"
import React from "react"
import Typography from "./Typography"

interface ImpactCardProps {
  title?: string
  content?: string
}

const ImpactCard: React.FC<ImpactCardProps> = (props) => {
  const { title, content } = props
  return (
    <div className="h-[251px] max-w-[421.33px] rounded-xl flex flex-col justify-center items-center bg-light-blue">
      <div>
        <Typography type="Title" className="text-[112px] font-size-semibold text-white  text-center">
          {title}
        </Typography>
      </div>
      <div className="pt-10 xl:pt-2">
        <Typography className="text-white text-center">{content}</Typography>
      </div>
    </div>
  )
}

export default ImpactCard
