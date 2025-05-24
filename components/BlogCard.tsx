import React from "react"
import Typography from "./Typography"
import blog1 from "@/assets/images/blog1.svg"

interface BlogCardProps {
  haeding?: string
}

const BlogCard: React.FC<BlogCardProps> = ({}) => {
  return (
    <div className="lg:max-w-[632px] pt-12 xl:pt-0 w-full">
      <div className="rounded-xl">
        <img src={blog1.src} alt="" className="lg:h-[429px] w-full rounded-xl" />
      </div>
      <div className="pt-4">
        <div className="flex items-center">
          <Typography type="Custom" className="text-sm">
            11 Jan 2022
          </Typography>
          <div className="px-2">
            <Typography type="Custom" className="text-sm">
              •
            </Typography>
          </div>
          <Typography type="Custom" className="text-sm">
            5 min read
          </Typography>
        </div>
        <div className="pt-2">
          <Typography type="Custom" className="text-2xl font-size-semibold">
            Blog title heading will go here
          </Typography>
          <Typography type="Custom" className="xl:text-base pt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
