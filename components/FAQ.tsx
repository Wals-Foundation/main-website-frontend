import React from "react"
import Typography from "./Typography"
import Button from "./Button"
import arrowDown from "@/assets/images/arrow-down.svg"

interface FAQProps {
  none?: string
}

const FAQ: React.FC<FAQProps> = ({}) => {
  return (
    <section className="py-16 xl:py-32 bg-section-bg-gray">
      <div className="max-w-[1440px] mx-auto">
        <div className="w-11/12 mx-auto ">
          <div className="xl:flex justify-between items-start">
            <div className="pb-8 xl:pb-0 xl:max-w-[500px]">
              <Typography type="Subtitle">Frequently asked questions</Typography>
              <div className="py-2">
                <Typography type="Custom">
                  Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to
                  action, they may still have questions (doubts) that can be answered.
                </Typography>
              </div>
              <div className="pt-4">
                <Button title="Contact Us" theme="border" />
              </div>
            </div>
            <div className="xl:max-w-[732px] border-t">
              <div className="py-5 border-b">
                <div className="flex justify-between items-center">
                  <Typography className="font-size-bold">Question text goes here</Typography>
                  <div>
                    <img src={arrowDown.src} alt="" />
                  </div>
                </div>
                <div className="pt-10">
                  <Typography>
                    Founded in 2018, WE ARE LIBERATING SOCIETIES FOUNDATION started as a small community effort in Ghana, helping
                    families access resources to start businesses and generate sustainable income. A world without extreme poverty
                    and with economic opportunity for all. To enable community-driven economic growth to eradicate poverty and
                    create resilient societies.
                  </Typography>
                </div>
              </div>
              <div className="py-5 border-b">
                <div className="flex justify-between items-center">
                  <Typography className="font-size-bold">Question text goes here</Typography>
                  <div>
                    <img src={arrowDown.src} alt="" />
                  </div>
                </div>
                <div className="pt-10 hidden">
                  <Typography>
                    Founded in 2018, WE ARE LIBERATING SOCIETIES FOUNDATION started as a small community effort in Ghana, helping
                    families access resources to start businesses and generate sustainable income. A world without extreme poverty
                    and with economic opportunity for all. To enable community-driven economic growth to eradicate poverty and
                    create resilient societies.
                  </Typography>
                </div>
              </div>
              <div className="py-5 border-b">
                <div className="flex justify-between items-center">
                  <Typography className="font-size-bold">Question text goes here</Typography>
                  <div>
                    <img src={arrowDown.src} alt="" />
                  </div>
                </div>
                <div className="pt-10 hidden">
                  <Typography>
                    Founded in 2018, WE ARE LIBERATING SOCIETIES FOUNDATION started as a small community effort in Ghana, helping
                    families access resources to start businesses and generate sustainable income. A world without extreme poverty
                    and with economic opportunity for all. To enable community-driven economic growth to eradicate poverty and
                    create resilient societies.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
