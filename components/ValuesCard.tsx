import React from "react"
import Typography from "./Typography"

interface ValuesCardProps {
  title?: string
  image?: string
  content?: string
}

const ValuesCard: React.FC<ValuesCardProps> = (props) => {
  const { title, image, content } = props
  return (
    <div className="xl:max-w-[416px]">
      <div>
        <img src={image} className="h-12 w-12" alt="" />
      </div>
      <div>
        <Typography className="xl:text-2xl" type="Subtitle">
          {title}
        </Typography>
      </div>
      <div>
        <Typography type="Custom">{content}</Typography>
      </div>
    </div>
  )
}

export default ValuesCard
