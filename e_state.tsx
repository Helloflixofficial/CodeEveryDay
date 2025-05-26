import { Button } from "@/Components/ui/button";
import { Card, CardContent} from "@/Components/ui/card";
import Image from "next/image";
import { ImageSlider } from "@/Components/Inside/image-slider";
import { FeaturedProperties } from "@/Components/Inside/featured-properties";
import { ChevronRight, Building, Building2, Landmark, Phone, Link } from "lucide-react";
import { CityExplorer } from "@/Components/Inside/city-explorer";

export default function Home() {
  const sliderImages = [
    "https://fnf01oel9v.ufs.sh/f/EOZaiOEcIDztILuCKnMdwxDSj4m80oyRAau3k2FLJdtPKpWr",
    "https://fnf01oel9v.ufs.sh/f/EOZaiOEcIDztnq3dpRktA1zqk6RsMILDOmE7pcaFN2ZidWBH",
    "/placeholder.svg?height=800&width=1200",
  ]
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      {/* Hero Section with Image Slider */}
      <section className="w-full">
        <ImageSlider images={sliderImages} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mb-8 drop-shadow-lg">India's No. 1 Property Portal</p>
        </div>
      </section>


      {/* City Explorer */}
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">TOP CITIES</h2>
            <h3 className="text-3xl font-bold text-gray-900">Explore Real Estate in Popular Indian Cities</h3>
          </div>
          <CityExplorer />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Properties</h2>
            <p className="text-muted-foreground">Handpicked properties for your consideration</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 flex items-center">
            View All Properties <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <FeaturedProperties />
      </section>

      {/* Property Categories */}
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse Properties by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">

                </div>
                <h3 className="font-medium">Apartments</h3>
                <p className="text-sm text-muted-foreground mt-1">20,000+ Properties</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Independent Houses</h3>
                <p className="text-sm text-muted-foreground mt-1">8,500+ Properties</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-amber-100 p-3 rounded-full mb-4">
                  <Building2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium">Villas</h3>
                <p className="text-sm text-muted-foreground mt-1">5,200+ Properties</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <Landmark className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium">Plots & Land</h3>
                <p className="text-sm text-muted-foreground mt-1">12,300+ Properties</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Why Choose Us */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Why Choose 99Acres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Largest Property Database</h3>
                  <p className="text-muted-foreground">Access to over 10 lakh properties across India's top cities</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Verified Listings</h3>
                  <p className="text-muted-foreground">
                    All properties are verified by our expert team for authenticity
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Expert Assistance</h3>
                  <p className="text-muted-foreground">
                    Get guidance from real estate experts throughout your property journey
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">99Acres</h3>
              <p className="text-muted-foreground">
                India's No.1 Property Portal. Find residential and commercial properties in India.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Buy Property
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Rent Property
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sell Property
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Property Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  1800-41-99099
                </li>
                <li className="text-muted-foreground">
                  <a href="mailto:feedback@99acres.com" className="hover:text-foreground transition-colors">
                    feedback@99acres.com
                  </a>
                </li>
                <li className="text-muted-foreground">Plot No. 8, Sector 44</li>
                <li className="text-muted-foreground">Gurugram, Haryana 122003</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Download App</h4>
              <div className="flex flex-col space-y-3">
                <a href="#" className="inline-block">
                  <Image
                    src="/placeholder.svg?height=40&width=135"
                    alt="Google Play"
                    width={135}
                    height={40}
                    className="rounded"
                  />
                </a>
                <a href="#" className="inline-block">
                  <Image
                    src="/placeholder.svg?height=40&width=135"
                    alt="App Store"
                    width={135}
                    height={40}
                    className="rounded"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} 99Acres. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
