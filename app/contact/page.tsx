import Typography from "@/components/Typography"
import FAQ from "@/components/FAQ"
import Input from "@/components/Input"
import Button from "@/components/Button"

export default function Contact() {
  return (
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32 pb-16">
        <div className="w-11/12 mx-auto">
          <div>
            <Typography type="Title" className="text-center">
              Get in touch
            </Typography>
          </div>
          <form>
            <div className="pt-8 xl:pt-32 lg:grid lg:grid-cols-2 gap-12">
              <div className="max-w-[616px] p-8 border rounded-xl space-y-5 bg-section-bg-gray border-form-border">
                <div>
                  <label htmlFor="name">Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Input placeholder="Enter your email" />
                </div>
                <div>
                  <label htmlFor="message">Mesage</label>
                  <Input type="textarea" placeholder="Enter your email" />
                </div>
                <div>
                  <Button title="Contact us" className="xl:w-full" />
                </div>
              </div>
              <div className="max-w-[648px] py-8 xl:py-0 xl:p-8 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <Typography>Email</Typography>
                    <Typography> info@wals.com </Typography>
                  </div>
                  <div className="w-full border-b border-form-border" />
                  <div className="flex justify-between items-center">
                    <Typography>Call us</Typography>
                    <Typography> (+233) 202-6814</Typography>
                  </div>
                  <div className="w-full border-b border-form-border" />
                  <div className="flex justify-between items-center">
                    <Typography>Visit us</Typography>
                    <Typography>Tseaddo B44, East La - Accra</Typography>
                  </div>
                  <div className="w-full border-b border-form-border" />
                  <div className="flex justify-between items-center">
                    <Typography>Chat with us</Typography>
                    <Typography>(+233) 202-6814</Typography>
                  </div>
                  <div className="w-full border-b border-form-border" />
                </div>
                <div className="flex justify-between">
                  <Typography>Follow us</Typography>
                  <div>
                    <Typography> (+233) 202-6814</Typography>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <FAQ />
    </main>
  )
}
