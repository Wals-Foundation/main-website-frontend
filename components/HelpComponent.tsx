import React from "react"
import arrow from "@assets/images/arrow.png"
import Typography from "./Typography"
import Link from "next/link"

interface HelpComponentProps {
  title: string
  content: string
  icon: string
}

const HelpComponent: React.FC<HelpComponentProps> = (props) => {
  const { title, content, icon } = props
  return (
    <Link href={"/"} className="xl:flex justify-between items-start py-10">
      <div className="w-auto">
        <img src={icon} alt="" className="w-12 h-12" />
      </div>
      <div className="mx-auto xl:max-w-[517px] flex justify-between items-start pt-5 xl:pt-0">
        <div className="max-w-[90%] xl:max-w-[443px]">
          <Typography type="Custom" className="text-left text-white text-2xl leading-8 font-size-semibold ">
            {title}
          </Typography>
          <Typography type="Custom" className="text-title-gray pt-5">
            {content}
          </Typography>
        </div>
        <div>
          <img src={arrow.src} alt="" className="h-10 w-10" />
        </div>
      </div>
    </Link>
  )
}

export default HelpComponent
