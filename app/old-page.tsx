"use client"
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

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"



export default function Home() {

  const [email, setEmail] = useState('')

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  return (
  <>
  
  {/* <PublicNavigations />
  <div className=" flex flex-col bg-white">
    <Banner />
    <HomeAbout />
  </div>
  <Footer /> */}
  </>
  );
}


