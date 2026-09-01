import { Hero } from "@/components/home/hero";
import { Destinations } from "@/components/home/destinations";
import { Packages } from "@/components/home/packages";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <Packages />
      <WhyUs />
      <Testimonials />
      <Cta />
    </>
  );
}
