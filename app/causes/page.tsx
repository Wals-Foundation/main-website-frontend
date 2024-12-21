"use client"
import Button from "@components/Button"
import Typography from "@components/Typography"
import CausesCard from "@components/CausesCard"

export default function Home() {
  return (
    <main className="bg-white">
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto py-20 xl:px-12 bg-white">
          <div className="w-11/12 mx-auto">
            <div></div>
            <div className="py-1 px-10 xl:px-0">
              <Typography type="Title" className="text-center text-[32px]">
                Causes we are <br /> passionate about
              </Typography>
            </div>
            <div className="hidden xl:block  pt-4">
              <Typography className="text-center max-w-[688px] mx-auto">
                Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates
                lasting change.
              </Typography>
            </div>
            <div className="pt-3 xl:hidden block">
              <Typography className="text-center  mx-auto">
                Donations should be made towards a specific community, program or project
              </Typography>
            </div>

            <div className="max-w-[568px] mx-auto py-10">
              <div className="flex justify-between items-center border-b border-border-gray">
                <div className="border-b-2 border-primary xl:px-8 pt-2 pb-3">
                  <Typography className="font-size-semibold xl:text-xl">Communities</Typography>
                </div>
                <div className="xl:px-8 pt-2 pb-3">
                  <Typography className="xl:text-xl">Programs</Typography>
                </div>
                <div className="xl:px-8 pt-2 pb-3">
                  <Typography className="xl:text-xl">Projects</Typography>
                </div>
              </div>
            </div>

            <div>
              <CausesCard />
            </div>
            <div>
              <CausesCard />
            </div>
            <div className="xl:hidden pt-10">
              <Button theme="secondary" title="View All Causes" />
            </div>
            <div className="hidden xl:flex justify-center pt-10">
              <Button theme="border" title="View All Causes" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
