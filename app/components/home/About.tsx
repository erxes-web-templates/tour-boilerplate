import { Button } from "@/components/ui/button"

export default function About() {
    return (
        <section className="bg-[#FAF7F2] grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[600px] lg:h-auto">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="https://cdn.abercrombiekent.com/files/bsiop5ln/production/bf8abe3ec1b71c32d3310d070755321c1d3553dd.mov" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20" />
                </div>
            <div className="bg-[#FAF7F2] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
                <div className="max-w-xl">
                    <div className="text-center pb-20">
                        <span className="font-extralight text-sm tracking-widest text-[#CD7F32]">OUR STORY</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extralight mb-8">Travel Responsibly</h2>

                    <div className="space-y-6 text-gray-700 text-sm font-light">
                    <p>
                        We believe travel should be a force for good. In the 1960s, our founder Geoffrey Kent and Jorie Butler
                        Kent pioneered the community-first approach to conservation. Today, we still believe that the best way to
                        protect our planet&apos;s remaining wilderness is to invest in the communities who live there.
                    </p>

                    <p>
                        Every trip you book with us benefits grassroots community and conservation initiatives led by our
                        nonprofit arm, A&K Philanthropy (AKP). We now support 55 projects in 25 countries, helping preserve some
                        of the world&apos;s most precious ecosystems, and ensuring that the people in the places where we travel are
                        benefitting directly from tourism.
                    </p>

                    <p>
                        We are committed to advancing conscious travel. With your help, we aim to incorporate A&K Philanthropy
                        ventures into every journey we create in the destinations where AKP operates.
                    </p>
                    </div>

                    <div className="mt-12 space-y-4">
                        <Button variant="link" className="text-black font-light underline hover:no-underline p-0 h-auto">
                            FIND OUT MORE
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}