import MainLayout from "@/components/main-layout"

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-8 bell-mt text-center text-gray-800 tracking-wide">
            About DERMAYOOTH
          </h1>

          <div className="prose prose-lg max-w-none bookman">
            <p>
              DERMAYOOTH is a premium aesthetic solution provider from India, dedicated to creating innovative and
              effective skincare products that help people achieve their best skin.
            </p>

            <h2 className="text-2xl mb-4 mt-8 bell-mt">Our Story</h2>
            <p>
              Founded with a passion for combining traditional skincare wisdom with modern scientific advancements,
              DERMAYOOTH has quickly established itself as a trusted name in the aesthetic and skincare industry in
              India.
            </p>
            <p>
              Our journey began with a simple mission: to provide high-quality, effective skincare solutions that
              address the unique concerns of our customers while maintaining the highest standards of quality and
              safety.
            </p>

            <h2 className="text-2xl mb-4 mt-8 bell-mt">Our Philosophy</h2>
            <p>
              At DERMAYOOTH, we believe that beautiful skin is healthy skin. Our approach combines science-backed
              formulations with premium ingredients to create products that not only improve the appearance of your skin
              but also enhance its overall health.
            </p>
            <p>We are committed to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Using high-quality, scientifically proven ingredients</li>
              <li>Creating formulations that are safe and effective for various skin types</li>
              <li>Continuous research and innovation to improve our products</li>
              <li>Maintaining rigorous quality control standards</li>
              <li>Providing excellent customer support and education</li>
            </ul>

            <h2 className="text-2xl mb-4 mt-8 bell-mt">Our Products</h2>
            <p>
              Our product range includes specialized serums, creams, supplements, and treatments designed to address
              various skin concerns including pigmentation, aging, hydration, and overall skin health. Each product is
              meticulously formulated under the guidance of dermatologists to ensure optimal results.
            </p>

            <h2 className="text-2xl mb-4 mt-8 bell-mt">Quality Commitment</h2>
            <p>
              All DERMAYOOTH products undergo rigorous testing to ensure they meet our high standards of quality and
              effectiveness. We believe in transparency and provide detailed information about our ingredients and their
              benefits to help our customers make informed choices.
            </p>

            <div className="mt-12 text-center">
              <p className="italic">
                "At DERMAYOOTH, we don't just create skincare products; we create confidence and comfort in your own
                skin."
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
