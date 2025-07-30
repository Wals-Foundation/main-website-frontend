import AllCauses from "@/cause/ui/AllCauses";
import { HeadingLarge, TextLarge } from "@/components/Typography";

export default function Causes() {

  return (
    <section className="mt-8">
      <div className="w-11/12 md:max-w-[1052px] mx-auto">
        <HeadingLarge className="mt-4 text-center" text="Causes we are passionate about" />
        <TextLarge className="mt-4 text-center" text="Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates lasting change." />
        <AllCauses
          className="w-full mx-auto mt-4"
          causeDetailsUrl="causes"
          donateUrl="donate" />
      </div>
    </section>
  )
}
