import { motion } from "framer-motion";
import { Palette, ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const floating = {
  animate: {
    y: [0, -25, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center px-6">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] -top-24 -left-24"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[160px] bottom-0 right-0"></div>

      {/* Floating circles */}
      <motion.div
        className="absolute top-20 left-20 w-8 h-8 rounded-full bg-purple-400"
        {...floating}
      />

      <motion.div
        className="absolute bottom-32 right-24 w-5 h-5 rounded-full bg-pink-400"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
          transition: {
            repeat: Infinity,
            duration: 7,
          },
        }}
      />

      <motion.div
        className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-blue-400"
        animate={{
          y: [0, -30, 0],
          transition: {
            repeat: Infinity,
            duration: 5,
          },
        }}
      />

      <div className="relative z-10 max-w-5xl text-center">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          className="flex justify-center mb-10"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl"
          >
            <Palette
              size={46}
              className="text-purple-300"
            />
          </motion.div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: .6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8 }}
          className="text-[140px] md:text-[220px] font-black leading-none bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: .3 }}
          className="text-4xl md:text-5xl font-bold text-white mt-2"
        >
          Artwork Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: .5 }}
          className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-8"
        >
          The masterpiece you're looking for seems to have disappeared into the
          gallery vault. It may have been moved, deleted, or never existed.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="flex flex-wrap justify-center gap-5 mt-12"
        >
          <Link
            to="/"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center gap-3 shadow-xl hover:scale-105 transition"
          >
            <Home size={20} />
            Explore Gallery
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white font-semibold flex items-center gap-3 hover:bg-white/20 transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
      </div>

      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}