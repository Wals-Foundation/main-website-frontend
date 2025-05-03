import Image from "next/image"
import Link from "next/link"
import blog1 from "@/assets/images/blog1.svg"

export default function CauseDetailPage() {
  return (
    <main className="max-w-[1440px] mx-auto">
      <div className="px-4 md:px-20 py-10 max-w-[1050px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Microfinance Programs</h1>

        <div className="w-full">
          <div>
            <img src={blog1.src} className="w-full h-[570px]" />
          </div>

          <div className="grid grid-cols-2 gap-8 w-full py-16">
            <div>
              <div className="border-b flex justify-between py-4">
                <div className="text-sm text-gray-700">Community</div>
                <div>Tema Community 4</div>
              </div>

              <div className="border-b flex justify-between py-4">
                <div className="text-sm text-gray-700">Location</div>
                <div>Tema Community 4</div>
              </div>

              <div className="border-b flex justify-between py-4">
                <div className="text-sm text-gray-700">Community</div>
                <div>
                  <div>Sample Street, Tema </div>
                  <Link href="#" className="text-blue-500 underline text-sm ">
                    <p className="text-right">Get Directions</p>
                  </Link>
                </div>
              </div>

              <div className="border-b flex justify-between py-4">
                <div className="text-sm text-gray-700">Region</div>
                <div>Greater Accra</div>
              </div>

              <div className="border-b flex justify-between py-4">
                <div className="text-sm text-gray-700">District</div>
                <div>Tema</div>
              </div>
            </div>

            <div className="flex justify-center items-center p-5 text-sm bg-gray-50 rounded-md">
              <div className="w-full">
                <div>
                  <div className="font-bold text-xl py-3">GHS 1000.00</div>
                  <div className="text-gray-500">Donation Goal</div>
                </div>
                <div>
                  <div className="font-bold text-xl py-3">GHS 60.00</div>
                  <div className="text-gray-500">Total Donated</div>
                </div>
                <div>
                  <div className="font-bold text-xl py-3">GHS 940.00</div>
                  <div className="text-gray-500">Remaining</div>
                </div>
              </div>

              <div className="w-full mt-4">
                {/* Placeholder for donation chart */}
                <div className="h-40 w-40 border-[16px] border-blue-600 rounded-full mx-auto flex items-center justify-center text-xs text-center">
                  <div>
                    Total Donated <br /> <strong className="text-lg">GHS 60.00</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Sections */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="text-gray-700">
              {`Our primary objective is to enhance the AI’s ability to comprehend complex queries and provide accurate and contextually relevant responses. We aim to equip it with the capability to reason, analyze, and synthesize information from diverse sources, enabling users to tap into a vast pool of knowledge effortlessly.`}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Problem</h2>
            <p className="text-gray-700">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
              dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas
              eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
              per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
              ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis{" "}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Solution</h2>
            <p className="text-gray-700">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
              dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas
              eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
              per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
              ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis{" "}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Impact</h2>
            <p className="text-gray-700">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
              dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas
              eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
              per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
              ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-6">Activities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((_, i) => (
            <div key={i} className="border rounded-xl p-6 shadow-sm">
              <Image
                src={blog1.src} // Replace with your activity image path
                alt="Activity"
                width={600}
                height={300}
                className="rounded-lg mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Activity Title</h3>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500 mb-2">Expenditure</p>
                <p className="font-semibold mb-2 text-sm">GHS 4000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500 mb-2">Timeline</p>
                <p className="font-semibold mb-4 text-sm">20 March, 2024 - 30 November, 2024</p>
              </div>
              <p className="text-gray-700 text-sm">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie...
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
