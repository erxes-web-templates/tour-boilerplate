"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Search } from "lucide-react"

type NavItem = {
  title: string
}

const navigationItems: NavItem[] = [
  { title: "DESTINATIONS" },
  { title: "JOURNEYS" },
  { title: "STAYS" },
  { title: "THE EXCLUSIVE COLLECTION" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container bg-white b max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex border-0 overflow-hidden">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="w-full bg-white h-full overflow-y-auto">
                <div className="flex flex-col">
                  {navigationItems.map((item) => (
                    <button
                      key={item.title}
                      className="flex items-center justify-between p-6 text-left hover:text-[#CD7F32] border-b transition-colors"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                <div className="p-6 space-y-4">
                  <Button className="w-full font-light bg-[#CD7F32] hover:bg-[#B87333] text-white">LOGIN</Button>
                  <Button className="w-full font-light text-black bg-white border-black hover:bg-[#f1e7d3]">
                    REGISTER
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="text-black text-xl font-semibold tracking-wider ml-16">
            ABERCROMBIE & KENT
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Search />
            </Link>
            <span className="text-black text-sm hidden md:inline-block">(800) 554-7016</span>
            <Button variant="ghost" size="icon" className="text-black md:hidden">
              <Phone className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

