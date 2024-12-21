import React from "react"
import Typography from "./Typography"
import Button from "./Button"
import oldLady from "@assets/images/oldLady.png"

interface CausesCardProps {
  heading?: string
}

const CausesCard: React.FC<CausesCardProps> = ({}) => {
  return (
    <div className="max-w-[1052px] mx-auto bg-white p-6 xl:flex justify-between items-start rounded-2xl">
      <div>
        <img src={oldLady.src} alt="" className="rounded-xl" />
      </div>
      <div className="max-w-[482px] h-[429px] flex flex-col justify-between items-center">
        <div className="">
          <Typography type="Subtitle" className="text-left text-2xl">
            Microfinance Programs
          </Typography>
          <Typography type="Custom">
            We provide small loans and financial support to aspiring entrepreneurs, empowering them to start or grow their
            businesses.
          </Typography>
        </div>
        <div className="border-t border-light-gray pt-5">
          <Typography type="Custom">
            More than 5,000 small businesses have been established, lifting families out of poverty and promoting self-sustaining{" "}
            <br /> economies.
          </Typography>
          <div className="pt-4 xl:flex items-center">
            <div className="pb-4 xl:pb-0 x:pr-3">
              <Button theme="primary" title="Read More" />
            </div>
            <Button theme="secondary" title="Make a Donation" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CausesCard
