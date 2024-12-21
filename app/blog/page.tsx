import Button from "@components/Button"
import Typography from "@components/Typography"
import training from "@assets/images/training.svg"
import BlogCard from "@components/BlogCard"

export default function Blog() {
  return (
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32">
        <div className="w-11/12 mx-auto">
          <div>
            <Typography type="Title" className="text-center">
              Blog
            </Typography>
          </div>
          <div>
            <div className="lg:flex justify-between items-end pt-16 gap-12">
              <div className="w-full lg:max-w-[656px] rounded-xl">
                <img src={training.src} alt="" className="w-full lg:w-auto lg:h-[461px] rounded-xl" />
              </div>
              <div className="lg:max-w-[656px]">
                <Typography
                  type="ParagraphHeader"
                  className="bg-transparent-blue text-primary flex flex-col items-center justify-center w-auto lg:max-w-[118px] py-2"
                >
                  Newest Blog
                </Typography>
                <div>
                  <div className="flex items-center pb-2">
                    <Typography>11 Jan 2022</Typography>
                    <div className="px-2">
                      <Typography>•</Typography>
                    </div>
                    <Typography>5 min read</Typography>
                  </div>
                  <div>
                    <div className="pb-6">
                      <Typography type="Custom" className="text-[48px] leading-[56px]">
                        Blog title heading will go here
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
                      </Typography>
                    </div>
                    <div />
                    <Button theme="border" title="Make a Donation" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-32 lg:grid lg:grid-cols-2 gap-12">
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
