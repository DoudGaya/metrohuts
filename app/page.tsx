import { Banner } from "@/components/Banner";
import { HomeAbout } from "@/components/HomeAbout";
import { HomeWhatWeDo } from "@/components/WhatWeDo";
import { HomeMarketing2} from "@/components/HomeMarketing2";
import { HomeIcons } from "@/components/HomeIcons";
import { Metrics } from "@/components/Metrics";
import { TheTeam } from "@/components/TheTeam";
import { HomeSales } from "@/components/HomeSales";
import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
  <>
  <PublicNavigations />
  <div className=" flex flex-col bg-white">
    <Banner />
    <HomeAbout />
    {/* <div className="w-full flex-col flex">
      <div className=" max-w-7xl  mx-auto">
      </div>
        <div className="">
        <HomeWhatWeDo />
        <div className="">
        <div className=" my-10">
        <HomeSales />
        </div>
        </div>
        <HomeMarketing2 />
        </div>
       <div className="">
       <HomeIcons />
       </div>
    </div> */}
  </div>
  <Footer />
  </>
  );
}


