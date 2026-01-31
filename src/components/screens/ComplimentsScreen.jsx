"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MoveRight, Sparkles, Music, Music2 } from "lucide-react";

const compliments = [
  "You look adorable",
  "You have the sweetest vibe",
  "You make things feel lighter",
  "You are naturally charming",
  "You make everything feel more special",
];

const images = [
  "/images/her.jpeg",
  "/images/her2.jpeg",
  "/images/her3.jpeg",
  "/images/her4.jpeg",
  "/images/her5.jpeg",
];

function Card({ text, image, open, onClick }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl border border-pink-500/20 bg-white/5 backdrop-blur-md overflow-hidden shadow-lg"
      whileTap={{ scale: 0.98 }}
    >
      {!open && (
        <motion.div className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-pink-300">
            <Sparkles size={18} />
            <span className="text-sm tracking-wide">Tap to open ✨</span>
          </div>
          <Heart className="text-pink-400 fill-pink-400" />
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-6 space-y-4"
          >
            <motion.img
              src={image}
              alt="her"
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover border-2 border-pink-400 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-base sm:text-lg text-zinc-100 font-medium"
            >
              {text}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ComplimentsScreen({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const [name, setName] = useState("You");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get("name");
    if (n) setName(n);
  }, []);

  const progress = openIndex !== null ? openIndex + 1 : 0;

  return (
    <motion.div className="flex flex-col items-center justify-center w-full h-full text-center relative overflow-hidden">

      {/* Floating hearts */}
      <div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-transparent" />

      <div className="w-full max-w-xl mx-auto flex flex-col gap-8 px-4">

        {/* Music toggle */}
        <button
          onClick={() => setMusicOn(!musicOn)}
          className="absolute top-4 right-4 text-pink-300"
        >
          {musicOn ? <Music2 /> : <Music />}
        </button>

        {/* Top Heart */}
        <motion.div
          className="w-28 h-28 mx-auto rounded-full bg-linear-to-br from-pink-500/20 to-rose-500/20 border border-pink-400/30 flex items-center justify-center backdrop-blur-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Heart className="w-14 h-14 text-pink-400 fill-pink-400" />
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-dancing-script text-zinc-50">
          Just for you , Lavanya 💖
        </h2>

        {/* Progress */}
        <p className="text-pink-300 text-sm">💝 {progress} / {compliments.length} surprises unlocked</p>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4">
          {compliments.map((text, i) => (
            <Card
              key={i}
              text={text}
              image={images[i]}
              open={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Final message */}
        {progress === compliments.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-pink-200"
          >
            And just so you know… you mean more than these words can say 💗
          </motion.p>
        )}

        {/* Next button */}
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.96 }}
          className="mx-auto w-full sm:w-auto bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl flex items-center gap-2 justify-center"
        >
          <span>Continue</span>
          <MoveRight size={20} />
        </motion.button>

      </div>
    </motion.div>
  );
}
