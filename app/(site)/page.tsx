import { Hero } from "@/components/home/hero";
import { Regions } from "@/components/home/regions";
import { Recommended } from "@/components/home/recommended";
import { PopularNow } from "@/components/home/popular-now";
import { Provinces } from "@/components/home/provinces";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Regions />
      <Recommended />
      <PopularNow />
      <Provinces />
      <WhyUs />
      <Testimonials />
      <Cta />
    </>
  );
}
