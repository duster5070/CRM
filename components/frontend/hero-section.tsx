'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { motion } from 'framer-motion';
import ParticleAssemble from "../ui/FramerShatter";
import { ArrowRight } from "lucide-react";

import { Session } from "next-auth";

export default function HeroSection({ session }: { session: Session | null }) {


  return (
    <section
      id="home"
      className="py-20 text-center"
      style={{
        background:
          'linear-gradient(to top, rgba(246, 250, 253, 0.8), transparent), url("/Background pattern.svg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="inline-flex items-center">
        <ParticleAssemble
          width={340}
          height={48}
          particleCount={200}
          duration={0.6}
          delay={20}
        >
          <span className="text-[var(--pika-secondary)] border rounded-full bg-[var(--pika-background)] px-4 py-2 inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8.03339 3.65784C8.37932 2.78072 9.62068 2.78072 9.96661 3.65785L11.0386 6.37599C11.1442 6.64378 11.3562 6.85576 11.624 6.96137L14.3422 8.03339C15.2193 8.37932 15.2193 9.62068 14.3422 9.96661L11.624 11.0386C11.3562 11.1442 11.1442 11.3562 11.0386 11.624L9.96661 14.3422C9.62067 15.2193 8.37932 15.2193 8.03339 14.3422L6.96137 11.624C6.85575 11.3562 6.64378 11.1442 6.37599 11.0386L3.65784 9.96661C2.78072 9.62067 2.78072 8.37932 3.65785 8.03339L6.37599 6.96137C6.64378 6.85575 6.85576 6.64378 6.96137 6.37599L8.03339 3.65784Z"
                stroke="#01579B"
                strokeWidth="1.5"
              />
              <path
                d="M16.4885 13.3481C16.6715 12.884 17.3285 12.884 17.5115 13.3481L18.3121 15.3781C18.368 15.5198 18.4802 15.632 18.6219 15.6879L20.6519 16.4885C21.116 16.6715 21.116 17.3285 20.6519 17.5115L18.6219 18.3121C18.4802 18.368 18.368 18.4802 18.3121 18.6219L17.5115 20.6519C17.3285 21.116 16.6715 21.116 16.4885 20.6519L15.6879 18.6219C15.632 18.4802 15.5198 18.368 15.3781 18.3121L13.3481 17.5115C12.884 17.3285 12.884 16.6715 13.3481 16.4885L15.3781 15.6879C15.5198 15.632 15.632 15.5198 15.6879 15.3781L16.4885 13.3481Z"
                stroke="#01579B"
                strokeWidth="1.5"
              />
            </svg>
            The new standard of product teams
          </span>
        </ParticleAssemble>
      </div>
      <div className="container mx-auto text-center w-full">
        <h1 className="text-[6rem] mb-4 w-[60rem] text-primary mx-auto relative">
          Chaos to Clarity in One Click
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="112"
              height="112"
              viewBox="0 0 112 112"
              fill="none"
              className="absolute right-[13rem] bottom-[-1.5rem]"
            >
              <g filter="url(#filter1_d_15_535)">
                <path
                  d="M77.3471 89.5995L58.9684 71.2207L53.356 76.8331C47.6102 82.5789 44.7374 85.4517 41.6496 84.7736C38.5618 84.0954 37.1572 80.283 34.3481 72.6583L24.9794 47.2288C19.3755 32.0182 16.5735 24.413 20.4933 20.4932C24.4131 16.5734 32.0184 19.3754 47.2289 24.9793L72.6584 34.348C80.2831 37.1571 84.0955 38.5617 84.7737 41.6495C85.4519 44.7372 82.579 47.6101 76.8332 53.3559L71.2209 58.9683L89.5996 77.347C91.5026 79.25 92.4541 80.2015 92.8937 81.2629C93.48 82.6782 93.48 84.2683 92.8937 85.6836C92.4541 86.745 91.5026 87.6965 89.5996 89.5995C87.6966 91.5025 86.7451 92.454 85.6837 92.8936C84.2684 93.4798 82.6783 93.4798 81.263 92.8936C80.2016 92.454 79.2501 91.5025 77.3471 89.5995Z"
                  fill="#01579B"
                  fillOpacity="0.42"
                  shapeRendering="crispEdges"
                />
              </g>
              <defs>
                <filter
                  id="filter1_d_15_535"
                  x="9.66675"
                  y="18.6666"
                  width="92.6667"
                  height="92.6666"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="9" />
                  <feGaussianBlur stdDeviation="4.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_15_535"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_15_535"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </h1>
        <p className="text-primary mx-auto w-[488px] text-[16px] mt-8 mb-12">
          Empower your team with tools to organize tasks, track progress, and
          collaborate seamlessly--all in one intuitive platform
        </p>
        <div>
          <Button
            asChild
            size="lg"
            className="rounded-full h-12 px-6 text-base"
          >
            <Link href={session ? "/dashboard" : "/register"}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <button className="bg-transparent border border-primary text-primary px-[40px] py-[14px] rounded-full ml-4 hover:bg-[var(--pika-background)] hover:text-[var(--pika-secondary)] transition">
            Explore Features
          </button>
        </div>
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >

          <img
            src="/screen-shot-1.svg"
            alt="screen shot"
            className="mx-auto mt-16"
          />
        </motion.div>
      </div>
    </section>

  );
}

