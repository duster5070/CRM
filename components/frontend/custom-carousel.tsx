"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    image: "/images/slide-1.jpg",
    title: "Accelerate Development,",
    subtitle: "Build Fullstack Apps Faster",
  },
  {
    image: "/images/slide-2.jpg",
    title: "Powerful Tools,",
    subtitle: "All in One Starter Kit",
  },
  {
    image: "/images/slide-3.jpg",
    title: "Streamlined Workflows,",
    subtitle: "Focus on What Matters",
  },
];

export default function CustomCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-purple-900">
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-purple-900/50" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end p-6 text-white">
        <h2 className="mb-2 text-3xl font-bold">{carouselItems[currentSlide].title}</h2>
        <p className="mb-8 text-xl">{carouselItems[currentSlide].subtitle}</p>
        <div className="mb-4 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "w-4 bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform text-white/75 transition-colors hover:text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform text-white/75 transition-colors hover:text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}
