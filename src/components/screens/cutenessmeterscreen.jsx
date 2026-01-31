"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function CutenessMeterScreen({ onNext }) {
  const [value, setValue] = useState(0);
  const controls = useAnimation();

  /* ⏳ Slow meter fill */
  useEffect(() => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 1;
      setValue(progress);

      // 💓 Bounce at checkpoints
      if (progress % 20 === 0) {
        controls.start({
          scale: [1, 1.08, 1],
          transition: { duration: 0.6 },
        });
      }

      // 💥 Overload shake
      if (progress === 100) {
        controls.start({
          x: [0, -8, 8, -6, 6, 0],
          transition: { duration: 0.6 },
        });
      }

      // 💖 Finish
      if (progress >= 120) {
        clearInterval(interval);

        setTimeout(() => {
          onNext();
        }, 2000); // 2 sec emotional pause
      }
    }, 80); // 🔥 speed control (increase = slower)

    return () => clearInterval(interval);
  }, [controls, onNext]);

  return (
    <motion.div
      className="w-full max-w-xl text-center text-white"
      animate={controls}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        It keeps increasing... just like the way you matter to me 💗
      </h2>

      {/* 🧪 Meter */}
      <div className="w-full h-6 bg-white/10 rounded-full overflow-hidden border border-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 via-red-400 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* 📊 Percentage */}
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-6 text-4xl font-extrabold text-pink-400"
      >
        {value}%
      </motion.div>

      {/* 💥 Warning */}
      {value >= 100 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-pink-300 text-lg"
        >
          ⚠ Too special to handle
        </motion.p>
      )}

      {/* 💖 Heart burst */}
      {value >= 120 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-5xl"
        >
          💖💖💖
        </motion.div>
      )}
    </motion.div>
  );
}
