import { Button } from "@/components/ui/button";


export default function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="https://cdn.abercrombiekent.com/files/bsiop5ln/production/5b783d00300c87f2ae7550551195a54378d361e3.mov" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-4 text-white">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight">
                Since 1962 we have set the standard for experiential travel. We believe that every journey should be
                extraordinary; every life, well-travelled.
                </h1>
                <div className="max-w-md mx-auto w-full">
                <Button className="bg-white/10 border-white/20 text-white font-light placeholder:text-white/70 text-center h-12">
                    WHERE DO YOU WANT TO GO              
                </Button>
                </div>
            </div>
        </div>
        <Button className="font-light absolute bottom-8 right-8 bg-[#CD7F32] hover:bg-[#B87333] text-white">
            SPEAK TO AN EXPERT
        </Button>
      </div>
    )
}