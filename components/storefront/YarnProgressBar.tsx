"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function YarnProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[60] pointer-events-none bg-transparent">
      {/* Background track */}
      <div className="w-full h-full bg-[#E5DAC6]/30 backdrop-blur-xs">
        {/* Animated terracotta yarn strand */}
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 via-clay-500 to-clay-600 origin-left relative"
          style={{ scaleX }}
        >
          {/* Leading tiny yarn loop charm */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-clay-600 shadow-sm border border-[#FAF6F0]" />
        </motion.div>
      </div>
    </div>
  );
}
