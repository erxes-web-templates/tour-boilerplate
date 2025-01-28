import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Newsletter Section */}
          <div className="lg:col-span-6">
            <div className="mb-8">
              <Image src="/Erxes-logo.png" alt="Erxes" width={97} height={47}/>
            </div>
            <h2 className="text-2xl font-extralight mb-4">Find your next adventure</h2>
            <p className="text-sm font-light text-gray-400 mb-8">A&K's newsletter is packed with inspiration for your next trip.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" placeholder="First Name*" className="bg-white text-black" />
                <Input type="text" placeholder="Last Name*" className="bg-white text-black" />
              </div>
              <Input type="email" placeholder="E-mail Address*" className="bg-white text-black" />
              <Textarea placeholder="Your Message" className="bg-white text-black"/>
              <div className="space-y-6">
                <p className="font-light text-xs">ARE YOU A TRAVEL ADVISOR?</p>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">YES</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">NO</Label>
                  </div>
                </RadioGroup>
              </div>
              <p className="text-xs font-extralight text-gray-400">
                By entering your email, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                , including receipt of emails and promotions.
              </p>
              <Button
                type="submit"
                className="w-full bg-transparent font-light border border-white hover:bg-white hover:text-black transition-colors"
              >
                SEND MESSAGE
              </Button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-light text-sm mb-4">COMPANY</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="font-light font-sm">
                    <p className="text-xs font-extralight">About Us</p>
                  </Link>
                </li>
                <li>
                  <Link href="/philanthropy" className="font-light font-sm">
                    <p className="text-xs font-extralight">A&K Philanthropy</p>
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="font-light font-sm">
                    <p className="text-xs font-extralight">Press</p>
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="font-light font-sm">
                    <p className="text-xs font-extralight">Careers</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="font-light font-sm">
                    <p className="text-xs font-extralight">Contact Us</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-light text-sm">SERVICES</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/brochures" className="font-light font-sm">
                    <p className="text-xs font-extralight">Travel Brochures</p>
                  </Link>
                </li>
                <li>
                  <Link href="/protection" className="font-light font-sm">
                    <p className="text-xs font-extralight">Guest Protection Program</p>
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="font-light font-sm">
                    <p className="text-xs font-extralight">A&K App</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-light text-sm">POLICIES AND LEGAL</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="font-light font-sm">
                    <p className="text-xs font-extralight">Booking Terms and Conditions</p>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="font-light font-sm">
                    <p className="text-xs font-extralight">Terms of Use</p>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="font-light font-sm">
                    <p className="text-xs font-extralight">Cookie Preferences</p>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="font-light font-sm">
                    <p className="text-xs font-extralight">Privacy Policy</p>
                  </Link>
                </li>
                <li>
                  <Link href="/data-processing" className="font-light font-sm">
                    <p className="text-xs font-extralight">Data Processing Agreement</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-6 mt-12">
          <Link href="/" className="hover:opacity-75">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="/" className="hover:opacity-75">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link href="/" className="hover:opacity-75">
            <Youtube className="w-6 h-6" />
          </Link>
          <Link href="/" className="hover:opacity-75">
            <Linkedin className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

