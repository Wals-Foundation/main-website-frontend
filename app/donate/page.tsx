"use client"
import Typography from "@/components/Typography"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { Swiper, SwiperSlide } from "swiper/react"
import Testimonies from "@/components/Testimonies"
import people4 from "@/assets/images/people4.png"
import people5 from "@/assets/images/people5.png"
import { useState } from "react"
import { usePaystackPayment } from "react-paystack"

export default function Donate() {
  const [data, setData] = useState({ name: "", email: "", cause: "", amount: "", message: "" })

  const [loading, setLoading] = useState(false)

  const config = {
    reference: new Date().getTime().toString(),
    email: data.email || "test@gmail.com",
    amount: Number(data.amount) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK || "",
    currency: "GHS",
  }

  // you can call this function anything
  const onSuccess = (reference: string) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
    setLoading(false)
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed")
    setLoading(false)
  }

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config)
    return (
      <div>
        <Button
          title="Donate"
          type="submit"
          className="md:w-full"
          loading={loading}
          onClick={() => {
            console.log(data.amount)
            setLoading(true)
            initializePayment({ onSuccess, onClose })
          }}
        />
      </div>
    )
  }

  return (
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto pt-16 md:pt-32">
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
          <div className="pt-16 flex justify-center">
            <div className="w-full max-w-[616px] p-8 border rounded-xl space-y-5 bg-section-bg-gray border-form-border">
              <div>
                <label htmlFor="name">Name</label>
                <Input placeholder="Enter your name" onChange={(e) => setData({ ...data, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input placeholder="Enter your email" onChange={(e) => setData({ ...data, email: e.target.value })} />
              </div>
              <div>
                <label htmlFor="email">Cause</label>
                <div>
                  <select
                    name=""
                    id=""
                    value=""
                    className="bg-white w-full border px-6 py-4 rounded-lg"
                    onChange={(e) => setData({ ...data, cause: e.target.value })}
                  >
                    <option value="">Select a cause</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="email">Amount</label>
                <Input
                  placeholder="Enter amount"
                  value={data.amount}
                  onChange={(e) => setData({ ...data, amount: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message">Mesage</label>
                <Input
                  type="textarea"
                  placeholder="Type message here"
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                />
              </div>
              <div>
                <PaystackHookExample />
              </div>
            </div>
          </div>
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
