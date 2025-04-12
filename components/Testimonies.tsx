import React, { ReactNode } from "react"
import Typography from "./Typography"

interface TestimoniesProps {
  content: ReactNode
  icon: string
  username: string
  position: string
}

const Testimonies: React.FC<TestimoniesProps> = (props) => {
  const { icon, content, username, position } = props
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto pt-10">
        <div className="w-11/12 mx-auto relative xl:h-[516px] flex flex-col justify-center items-center">
          <Typography
            type="Custom"
            className="text-center text-header text-2xl leading-8  max-w-[768px] mx-auto font-size-semibold"
          >
            {content}
          </Typography>
          <div className="flex items-center pt-16">
            <img src={icon} alt="" className="w-14 h-14 rounded-full" />
            <div className="pl-4">
              <Typography type="Custom" className="font-size-medium">
                {username}
              </Typography>
              <Typography type="Custom" className="text-ash">
                {position}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonies
