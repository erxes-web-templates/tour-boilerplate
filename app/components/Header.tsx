'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { CmsMenuList } from "@/types/cms";
import { ChevronRight, Menu, X, Phone, Search } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  items?: { title: string }[]
}

const navigationItems: NavItem[] = [
  {
    title: "DESTINATIONS",
    items: [{ title: "Item1" },
      { title: "Item2" },
      { title: "Item3" },],
  },
  {
    title: "JOURNEYS",
    items: [
      { title: "ALL JOURNEYS" },
      { title: "SMALL GROUP JOURNEYS" },
      { title: "PRIVATE TRAVEL" },
      { title: "CRUISES" },
      { title: "PRIVATE JET" },
      { title: "SAFARI" },
    ],
  },
  {
    title: "STAYS",
    items: [
      { title: "Item1" },
      { title: "Item2" },
      { title: "Item3" },
    ],
  },
  {
    title: "THE EXCLUSIVE COLLECTION",
    items: [{ title: "Item1" },
      { title: "Item2" },
      { title: "Item3" },],
  }
]

// export default function Header({ menuList }: { menuList: CmsMenuList[] }) {
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<NavItem | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container bg-white b mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* <Button variant="ghost" size="icon" className="text-black">
            <Menu className="h-6 w-6" />
          </Button> */}
          {/* Drawer */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex border-0 overflow-hidden">
              <div
                className={cn("w-full bg-white h-full overflow-y-auto", activeItem?.items?.length ? "sm:w-1/2" : "sm:w-full")}
              >
                <SheetHeader className="p-6 border-b">
                  <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </SheetHeader>

                <div className="flex flex-col">
                  {navigationItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setActiveItem(item)}
                      className={cn(
                        "flex items-center justify-between p-6 text-left hover:text-[#CD7F32] border-b transition-colors",
                        activeItem?.title === item.title && "text-[#CD7F32]",
                      )}
                    >
                      {item.title}
                      {item.items?.length > 0 && (
                        <ChevronRight
                          className={cn("h-5 w-5 transition-transform", activeItem?.title === item.title && "rotate-180")}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6 space-y-4">
                  <Button className="w-full bg-[#CD7F32] hover:bg-[#B87333] text-white">LOGIN</Button>
                  <Button variant="outline" className="w-full border-black hover:bg-black hover:text-white">
                    REGISTER
                  </Button>
                </div>
              </div>

              {activeItem?.items?.length > 0 && (
                <div className="hidden sm:block w-1/2 bg-white h-full border-l overflow-y-auto">
                  <div className="flex flex-col">
                    {activeItem.items.map((subItem) => (
                      <button key={subItem.title} className="p-6 text-left hover:text-[#CD7F32] border-b transition-colors">
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-black text-xl font-semibold tracking-wider ml-12">
            ABERCROMBIE & KENT
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/"><Search/></Link>
            <span className="text-black text-sm hidden md:inline-block">(800) 554-7016</span>
            <Button variant="ghost" size="icon" className="text-black md:hidden">
              <Phone className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
