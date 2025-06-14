"use client"
import React, { useState } from "react"
import Typography from "./Typography"
import Button from "./Button"
import arrowDown from "@/assets/images/arrow-down.svg"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What does the WALS Foundation do?",
    answer:
      "Founded in 2018, WE ARE LIBERATING SOCIETIES FOUNDATION started as a small community effort in Ghana, helping families access resources to start businesses and generate sustainable income.",
  },
  {
    question: "What is your mission?",
    answer:
      "A world without extreme poverty and with economic opportunity for all. To enable community-driven economic growth to eradicate poverty and create resilient societies.",
  },
  {
    question: "How can I support the foundation?",
    answer:
      "You can support us through donations, volunteering, or by spreading awareness of our mission. Every contribution helps bring lasting impact to the communities we serve.",
  },
]

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-32 bg-section-bg-gray">
      <div className="max-w-[1440px] mx-auto">
        <div className="w-11/12 mx-auto ">
          <div className="md:flex justify-between items-start">
            {/* Left Side */}
            <div className="pb-8 md:pb-0 md:max-w-[500px]">
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

            {/* Right Side - FAQ List */}
            <div className="md:max-w-[732px] w-full border-t">
              {faqData.map((item, index) => (
                <div key={index} className="py-5 border-b">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOpen(index)}>
                    <Typography className="font-size-bold">{item.question}</Typography>
                    <div className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                      <img src={arrowDown.src} alt="" />
                    </div>
                  </div>

                  {openIndex === index && (
                    <div className="pt-6">
                      <Typography>{item.answer}</Typography>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
