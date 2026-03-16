"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type LoaderProps = {
  text?: string;
  fullScreen?: boolean;
};

export default function JobPortalLoader({
  text = "Searching jobs...",
  fullScreen = false,
}: LoaderProps) {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.fromTo(
      dotsRef.current,
      { y: 0, opacity: 0.4 },
      {
        y: -10,
        opacity: 1,
        stagger: 0.2,
        duration: 0.4,
        ease: "power2.inOut",
      },
    ).to(dotsRef.current, {
      y: 0,
      opacity: 0.4,
      stagger: 0.2,
      duration: 0.4,
    });

    if (glassRef.current) {
      gsap.to(glassRef.current, {
        x: 20,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div
      role="status"
      aria-busy="true"
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      {/* Loader Icon */}
      <div className="relative flex items-center justify-center">
        {/* Briefcase Icon */}
        <div className="text-4xl">💼</div>

        {/* Magnifying glass */}
        <div ref={glassRef} className="absolute -right-4 top-2 text-xl">
          🔍
        </div>
      </div>

      {/* Animated Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el;
            }}
            className="h-3 w-3 rounded-full bg-primary"
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-muted-foreground font-medium">{text}</p>
    </div>
  );
}
