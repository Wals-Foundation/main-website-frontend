import React, { useState } from "react"
import Typography from "./Typography"
import { getYouTubeThumbnail } from "@/utils"

interface SliderContentProps {
  backgroundImageURL: string
  peoplesImages?: string[]
  title?: string
  subtitle?: string
  values?: { title: string; content: string }[]
  displayHeaderContent?: boolean
  displaySubContent?: boolean
  videoURL?: string
}

const SliderContent: React.FC<SliderContentProps> = (props) => {
  const { backgroundImageURL, peoplesImages, title, subtitle, values, displayHeaderContent, displaySubContent, videoURL } = props
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(#00000090, #00000090), url(${backgroundImageURL || ""})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        minHeight: "70vh",
      }}
    >
      <div className="max-w-[1440px] mx-auto py-10">
        <div className="w-11/12 mx-auto relative h-full">
          <div className="my-[60px] mx-2 md:ml-auto md:mr-5 max-w-[374px]">
            {displayHeaderContent && (
              <div className="md:max-w-[374px] bg-white rounded-xl p-5">
                <Typography type="Custom">
                  {title} Since 2010, our programs have <br /> empowered over 500 individuals.
                </Typography>
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {!!peoplesImages?.length &&
                      peoplesImages.map((item, n) => (
                        <div key={n} className="w-[41px] h-[41px] border-2 rounded-full border-white">
                          <img src={item} alt="" className="rounded-full" />
                        </div>
                      ))}
                  </div>
                  <div className="max-w-[176px]">
                    <Typography type="Custom" className="text-xs md:text-sm">
                      {subtitle} Make a donation to hear more save more lives
                    </Typography>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2" />
            {displaySubContent && (
              <div className="md:max-w-[374px] bg-white rounded-xl p-5">
                {!!values?.length &&
                  values.map((item, n) => (
                    <div key={n} className="py-2">
                      <Typography className="font-size-semibold">{item.title}</Typography>
                      <div className="pt-1">
                        <Typography type="Custom" className="text-sm ">
                          {item.content}
                        </Typography>
                      </div>
                    </div>
                  ))}

                <div className="pt-3">
                  {showVideo ? (
                    <iframe
                      src={videoURL || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                      width="100%"
                      height="200"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative cursor-pointer" onClick={() => setShowVideo(true)}>
                      <img
                        src={getYouTubeThumbnail(videoURL || "") || "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"}
                        alt="Video thumbnail"
                        className="w-full h-[200px]"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
                        ▶ Play Video
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SliderContent
