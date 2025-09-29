import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"

export default function CareersPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bell-mt text-center text-gray-800">Join Our Team</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto bookman">
          Be part of a dynamic team dedicated to innovation and excellence in the skincare industry.
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 bell-mt text-gray-800">We Are Hiring</h2>
          <p className="mb-6 bookman text-gray-700">
            At DERMAYOOTH, we're always looking for talented and passionate individuals to join our growing team. If
            you're enthusiastic about skincare, innovation, and making a difference in people's lives, we'd love to hear
            from you.
          </p>

          <p className="mb-6 bookman text-gray-700">
            Even if you don't see a specific position that matches your skills, we welcome you to submit your resume for
            future opportunities. We value initiative, creativity, and a customer-focused mindset.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 bell-mt">Why Join DERMAYOOTH?</h3>
            <ul className="space-y-2 bookman text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Be part of a growing company at the forefront of skincare innovation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Collaborative and supportive work environment</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Opportunities for professional growth and development</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Competitive compensation and benefits</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Make a real impact on people's confidence and wellbeing</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 bell-mt">Submit Your Application</h3>
            <p className="mb-4 bookman text-gray-700">
              Please submit your resume and a brief cover letter telling us why you'd like to join the DERMAYOOTH team.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 bookman text-sm text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 bookman text-sm text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 bookman text-sm text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="position" className="block mb-2 bookman text-sm text-gray-700">
                  Position of Interest
                </label>
                <input
                  type="text"
                  id="position"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="What role are you interested in?"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block mb-2 bookman text-sm text-gray-700">
                  Resume/CV
                </label>
                <input
                  type="file"
                  id="resume"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="block mb-2 bookman text-sm text-gray-700">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                  placeholder="Tell us about yourself and why you're interested in joining DERMAYOOTH"
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Submit Application
              </Button>
            </form>
          </div>
        </div>

        <div className="text-center text-gray-600 bookman">
          <p>For any questions regarding careers at DERMAYOOTH, please contact us at:</p>
          <p className="mt-2">
            <a href="mailto:manojnagar@dermayooth.com" className="text-green-600 hover:underline">
              manojnagar@dermayooth.com
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
