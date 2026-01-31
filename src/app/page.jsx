"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IntroScreen from "@/components/screens/IntroScreen";
import CutenessMeterScreen from "@/components/screens/cutenessmeterscreen";
import ComplimentsScreen from "@/components/screens/ComplimentsScreen";
import MessageScreen from "@/components/screens/MessageScreen";
import FinalScreen from "@/components/screens/FinalScreen";
import { useMusic } from "@/components/MusicProvider";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [hearts, setHearts] = useState([]);

  /* 💓 Floating hearts (hydration-safe) */
  useEffect(() => {
    setHearts(
      Array.from({ length: 8 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 10 + Math.random() * 6,
      }))
    );
  }, []);

  /* 💓 Heartbeat speed (screen-wise) */
  const heartbeatSpeed = [1.6, 1.2, 1.1, 1.0, 0.9][currentScreen];

  /* 🧠 All Screens */
  const screens = [
    <IntroScreen key="intro" onNext={() => setCurrentScreen(1)} />,

    <CutenessMeterScreen
      key="cute"
      onNext={() => setCurrentScreen(2)}
    />,

    <ComplimentsScreen
      key="compliments"
      onNext={() => setCurrentScreen(3)}
    />,

    <MessageScreen
      key="message"
      onNext={() => setCurrentScreen(4)}
    />,

    <FinalScreen key="final" />,
  ];

  return (
    <motion.div
      className="min-h-screen overflow-hidden relative"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #050505 40%, #3f031cbb 100%)",
      }}

      /* 💓 GLOBAL HEARTBEAT */
      animate={{ scale: [1, 1.01, 1] }}
      transition={{
        duration: heartbeatSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* 💓 Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/20 text-3xl"
            style={{ left: `${heart.left}%` }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* 🧠 Screen Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✨ Watermark */}
      <div className="fixed bottom-4 right-4 text-sm text-white/30 pointer-events-none z-50">
        made for Lavanya ♥️
      </div>
    </motion.div>
  );
}
