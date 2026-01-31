"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MoveRight } from "lucide-react";

const message = `I just want to say I’m sorry for everything I’ve done until now.

If anything ever hurt you, confused you, or made you feel uneasy, please know that it was never my intention. I truly regret it.

And no matter what, I hope you always keep smiling — because your smile has a way of making everything feel lighter and warmer.

By now, I think you already know how special you really are. You matter more than you probably realize, and you always will.`;

export default function MessageScreen({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [typedText, setTypedText] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!opened) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setTypedText(message.slice(0, index + 1));
        index++;

        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 28); // typing speed: balanced (not too fast, not too slow)

    return () => clearInterval(interval);
  }, [opened]);

  return (
    <motion.div className="flex flex-col items-center justify-center px-4 text-center">

      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-dancing-script text-zinc-50 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        A little note for you 💌
      </motion.h2>

      {/* Greeting Card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <AnimatePresence>
          {!opened && (
            <motion.div
              key="closed"
              onClick={() => setOpened(true)}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-3xl bg-linear-to-br from-pink-500/30 via-rose-500/20 to-pink-400/30 p-10 shadow-2xl backdrop-blur-xl border border-pink-400/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-4">
                <Heart className="w-12 h-12 text-pink-400 fill-pink-400 animate-pulse" />
                <p className="text-zinc-100 text-lg">Tap to open your note</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.div
              key="open"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="origin-top rounded-3xl bg-white/5 p-6 shadow-[0_0_40px_rgba(255,105,180,0.15)] border border-pink-400/20 backdrop-blur-md"
            >
              <div
                ref={scrollRef}
                className="text-left text-zinc-100 text-base leading-relaxed whitespace-pre-line max-h-[280px] overflow-y-auto pr-1"
              >
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl flex items-center gap-2"
      >
        <span>One more thing</span>
        <MoveRight size={20} />
      </motion.button>

    </motion.div>
  );
}
