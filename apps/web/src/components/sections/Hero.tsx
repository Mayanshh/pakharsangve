import Marquee, { MarqueeItem } from "@/components/ui/Marquee";

const CLIENT_LOGOS: MarqueeItem[] = [
  {
    id: "leonardo",
    name: "Leonardo Hotels",
    content: (
      <div className="flex flex-col items-center leading-none text-neutral-900">
        <span className="text-lg sm:text-xl font-medium tracking-[0.22em] uppercase">
          LEONARDO
        </span>
        <span className="mt-1 font-serif italic text-base sm:text-lg tracking-wide text-neutral-700">
          Hotels
        </span>
      </div>
    ),
  },
  {
    id: "hitachi",
    name: "Hitachi",
    content: (
      <span className="text-xl sm:text-2xl font-black tracking-[0.12em] uppercase text-black">
        HITACHI
      </span>
    ),
  },
  {
    id: "haines-watts",
    name: "Haines Watts",
    content: (
      <span className="text-lg sm:text-xl font-bold tracking-tight text-black">
        Haines<span className="font-extrabold ml-0.5">Watts</span>
      </span>
    ),
  },
  {
    id: "vislink",
    name: "Vislink",
    content: (
      <div className="flex items-center gap-2.5 text-black">
        <svg
          className="h-6 w-6 sm:h-7 sm:w-7"
          viewBox="0 0 32 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M2 3L16 25L30 3" />
          <path d="M9 3L16 14L23 3" />
        </svg>
        <span className="text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase">
          VISLINK
        </span>
      </div>
    ),
  },
  {
    id: "applied-nutrition",
    name: "Applied Nutrition",
    content: (
      <div className="flex flex-col leading-[0.9] font-black uppercase tracking-tighter text-black text-base sm:text-lg">
        <span>APPLIED</span>
        <span>NUTRITION</span>
      </div>
    ),
  },
  {
    id: "global",
    name: "Global",
    content: (
      <span className="text-xl sm:text-2xl font-extrabold tracking-[0.08em] uppercase text-black">
        GLOBAL
      </span>
    ),
  },
];

/*
 * RESPONSIVE STRATEGY
 * -------------------
 * Everything un-prefixed (or sm:/md:) is the new phone/tablet layout.
 * Everything prefixed with `lg:` is the ORIGINAL desktop/laptop value,
 * copied over exactly, so screens >= 1024px render as before.
 */
export default function Hero() {
    return (
        <section className="h-fit relative w-full box-border flex flex-col items-start px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-20 lg:py-16">
            <h1 className="text-black text-3xl tracking-tight  h-fit w-full font-semibold">Pakharsangave<span className="text-(--primary-clr) text-5xl">.</span></h1>
            <main id="hero" className="h-auto w-full pt-10 pb-6 sm:pt-12 md:mt-4 lg:mt-4 lg:h-screen lg:pt-20 lg:pb-0">
                <h2 className="text-black min-h-fit text-[10vw] leading-[1.15] lg:text-[7.8em] lg:leading-15 whitespace-normal tracking-tight font-semibold">
                    I run {" "}
                    <span className="inline-flex items-center align-middle mx-1.5 my-1 sm:mx-2 lg:mx-3 lg:my-2">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-[0.95em] w-[1.75em] lg:h-30 lg:w-55 object-cover object-center rounded-xl lg:rounded-2xl"
                        >
                            <source src="/videos/p.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </span>{" "} your Ads
                    like I own 
                    <span className="text-(--primary-clr) font-extrabold rounded-3xl overflow-hidden "> 50% </span> of your {" "}
                    <span className="inline-flex items-center align-middle mx-1.5 my-1 sm:mx-2 lg:mx-3 lg:my-2">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-[0.95em] w-[1.75em] lg:h-30 lg:w-55 object-cover object-center rounded-xl lg:rounded-2xl"
                        >
                            <source src="/videos/p2.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </span>{" "} business.   
                </h2>
                <p className="text-base sm:text-lg lg:text-[1.25rem] text-black w-full max-w-xl mt-6 lg:mt-0 lg:max-w-none lg:w-150 relative left-0 top-0 lg:left-150 lg:-top-5 leading-[1.35]"><span className="font-semibold">Indian-born, globally trusted </span> – we’ve generated <span className="font-semibold">£100M+ in client revenue </span> and manage £250K in monthly ad spend, backed by a world-class team built to improve the bottom line.</p>
                {" "}
                    <span className="inline-flex items-center align-middle relative mt-5 top-0 left-0 lg:mt-0 lg:-top-10 lg:left-10">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-24 w-44 sm:h-28 sm:w-52 lg:h-30 lg:w-55 object-cover object-center rounded-2xl"
                        >
                            <source src="/videos/p3.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </span>{" "}

                <div className="animate-smooth-float relative w-fit mt-5 px-6 py-3 lg:w-auto lg:mt-0 lg:px-10 bg-lime-300 rounded-full lg:absolute lg:top-74 lg:right-30 z-10 flex items-center justify-center shadow-[0_0_50px_rgba(190,242,100,0.5)] backdrop-blur-md cursor-pointer transition-transform duration-300 hover:scale-105">
                <h3 className="text-black text-lg font-semibold tracking-tight">
                    100M+ Client Revenue
                </h3>
            </div>
                <div className="animate-smooth-float relative w-fit mt-4 ml-auto px-6 py-3 lg:w-auto lg:mt-0 lg:ml-0 lg:px-10 bg-lime-300 rounded-full lg:absolute lg:top-150 lg:left-120 z-10 flex items-center justify-center shadow-[0_0_50px_rgba(190,242,100,0.5)] backdrop-blur-md cursor-pointer transition-transform duration-300 hover:scale-105">
                <h3 className="text-black text-lg font-semibold tracking-tight">
                    World Class Team
                </h3>
            </div>
            <div className="w-full flex flex-col items-start mt-8 lg:mt-0 lg:items-end justify-between">
                <a href="mailto:hello@pakharsangave.com" className="text-black font-semibold text-md hover:opacity-70 transition-opacity duration-200">
                hello@pakharsangave.com
            </a>
            <a href="tel:+91999999998" className=" text-black text-md hover:opacity-70 transition-opacity duration-200">
                +91 9876678901
            </a>
            </div>

            </main>
            <div className="w-full mt-6 lg:mt-0 overflow-hidden lg:overflow-visible">
                <Marquee
                  items={CLIENT_LOGOS}
                  speed={24}
                  direction="left"
                  slowOnHover={true}
                  fadeEdges={true}
                />
            </div>
        </section>
    );
}
