import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Blog1 from "@/assets/images/blog1.svg"
import { Activities as ActiviteType } from "@/utils/types"

interface ActivitiesProps {
  activities?: ActiviteType[]
  perView?: number
}

const Activities: React.FC<ActivitiesProps> = ({ activities = [], perView = 1 }) => {
  if (!activities.length) return <p>No activities listed.</p>

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={perView}
      spaceBetween={perView === 1 ? 10 : 20}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {activities.map((activity, i) => (
        <SwiperSlide key={i}>
          <Blog1 className="rounded-lg mb-4 object-cover h-[310px] w-full" />
          <h3 className="text-xl font-semibold mb-2">{activity.program?.name}</h3>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Expenditure</p>
            <p className="font-semibold">
              {activity.budgetCurrency?.code} {Number(activity.budgetAmount).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <p className="text-gray-500">Timeline</p>
            <p className="font-semibold">
              {activity.startDate && activity.endDate && (
                <>
                  {new Date(activity.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(activity.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </>
              )}
            </p>
          </div>
          <p className="text-gray-700 text-sm">{activity.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Activities
