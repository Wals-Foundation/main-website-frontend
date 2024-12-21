"use client"
import Typography from "@components/Typography"
import Input from "@components/Input"
import Button from "@components/Button"
import { Swiper, SwiperSlide } from "swiper/react"
import Testimonies from "@components/Testimonies"
import people4 from "@assets/images/people4.png"
import people5 from "@assets/images/people5.png"

export default function Donate() {
  return (
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32">
        <div className="w-11/12 mx-auto">
          <div>
            <Typography type="Title" className="text-center">
              Your donation, their future
            </Typography>
            <div className="max-w-[692px] mx-auto">
              <Typography className="text-center pt-2">
                Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates
                lasting change.
              </Typography>
            </div>
          </div>
          <form>
            <div className="pt-16 flex justify-center">
              <div className="w-full max-w-[616px] p-8 border rounded-xl space-y-5 bg-section-bg-gray border-form-border">
                <div>
                  <label htmlFor="name">Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Input placeholder="Enter your email" />
                </div>
                <div>
                  <label htmlFor="email">Cause</label>
                  <div>
                    <select name="" id="" value="" className="bg-white w-full border px-6 py-4 rounded-lg">
                      <option value="">Select a cause</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Amount</label>
                  <Input placeholder="Enter your email" />
                </div>
                <div>
                  <label htmlFor="message">Mesage</label>
                  <Input type="textarea" placeholder="Enter your email" />
                </div>
                <div>
                  <Button title="Donate" className="xl:w-full" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="relative">
        <Swiper
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1000 }}
          loop
        >
          <SwiperSlide>
            <Testimonies
              icon={people5.src}
              content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                    tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."`}
              username="Mark King"
              position="Student"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonies
              icon={people4.src}
              content={`"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                    tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."`}
              username="Mark King"
              position="Student"
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  )
}
