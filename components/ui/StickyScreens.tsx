"use client";
import clsx from "clsx";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function StickyScreens({
  i,
  src,
  name,
  id,
  range,
  target,
  progress,
}: {
  i: number;
  src: string;
  name: string;
  id: string;
  range: number[];
  target: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, range, [1, target]);
  const offset = i * 25;
  return (
    <div
      id={id}
      className="container mx-auto px-4 lg:h-[100vh] md:h-auto flex items-center justify-center sticky lg:top-[20vh] md:top-[25vh]" /* top done large and mid*/
    >
      <div
        className={clsx(
          "relative overflow-hidden",
          "lg:top-[calc(-10%+var(--offset))]"
        )}
        style={{ "--offset": `${offset}px` } as React.CSSProperties}
      >
        <motion.img
          src={src}
          alt={name}
          className="w-full h-auto"
          style={{ scale }}
        />
      </div>
    </div>
  );
}
