"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Footer from "@/components/footer";
import ResponsiveNavbar from "@/components/responsive-navbar";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <ResponsiveNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px]">
          <div className="relative w-full h-full">
            <Image
              src="/assets/two.jpeg"
              alt="Beautiful home interior"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center text-center text-white px-4">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">
                Welcome to Your Company Name – Transforming Spaces, Elevating
                Lifestyles.
              </h1>
              <p className="max-w-2xl text-lg md:text-xl">
                We create beautiful, functional spaces that reflect your unique
                style and enhance your quality of life.
              </p>
              <Button size="lg">
                Discover Our Services <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="inline-block bg-blue-100 px-3 py-1 text-sm text-blue-800 rounded-lg">
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Transforming Houses into Dream Homes Since 2010
                </h2>
                <p className="text-lg text-gray-600">
                  At Your Company Name, we believe that every space has the
                  potential to be extraordinary. Our team of passionate
                  designers and decorators work tirelessly to transform ordinary
                  spaces into stunning environments that reflect your
                  personality and meet your needs.
                </p>
                <div className="flex gap-4">
                  <Button>Our Services</Button>
                  <Button variant="outline">Meet Our Team</Button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/assets/two.jpeg"
                  alt="Beautiful home interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-blue-50">
          <div className="container px-4 md:px-6 text-center">
            <span className="inline-block bg-blue-100 px-3 py-1 text-sm text-blue-800 rounded-lg">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Expertise You Can Trust
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              We bring together skill, passion, and dedication to deliver
              exceptional home transformations.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {[
                { emoji: "🏡", title: "Home Transformations" },
                { emoji: "💰", title: "Budget-Friendly Ideas" },
                { emoji: "🎨", title: "Personalized Consultations" },
                { emoji: "⭐", title: "Trusted Expertise" },
              ].map((item, idx) => (
                <Card key={idx} className="shadow-md hover:shadow-xl">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center text-2xl bg-blue-100 text-blue-600 rounded-full">
                      {item.emoji}
                    </div>
                    <h3 className="font-bold text-xl">{item.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Before & After Gallery */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 text-center">
            <span className="inline-block bg-blue-100 px-3 py-1 text-sm text-blue-800 rounded-lg">
              Transformations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Before & After Gallery
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              See the dramatic differences our team has made in these stunning
              home transformations.
            </p>
            <Carousel className="max-w-5xl mx-auto mt-8">
              <CarouselContent>
                {[1, 2, 3, 4].map((item) => (
                  <CarouselItem
                    key={item}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-[250px]">
                          <Image
                            src={`/assets/two.jpeg?text=Before`}
                            alt={`Before ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative h-[250px]">
                          <Image
                            src={`/assets/two.jpeg?text=After`}
                            alt={`After ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-blue-600 text-white text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Start Your Home Transformation Today!
            </h2>
            <p className="text-lg text-blue-100 mt-4">
              Ready to transform your space? Contact us today and let's bring
              your vision to life.
            </p>
            <Button size="lg" className="mt-6">
              Get in Touch
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
