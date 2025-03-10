import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroGeometricProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function HeroGeometric({
  title = "Elevate Your Prompts",
  subtitle = "AI-Powered Enhancement",
  className,
}: HeroGeometricProps) {
  return (
    <div
      className={cn("relative overflow-hidden py-20 md:py-32", className)}
      style={{
        background:
          "linear-gradient(to right, rgba(0,0,0,0.9), rgba(30,11,48,0.8)), radial-gradient(circle at bottom right, rgba(255, 215, 0, 0.2), transparent 60%)",
      }}
    >
      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-10 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-700/40 to-blue-600/30 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-10 top-1/3 h-72 w-72 rounded-full bg-gradient-to-l from-blue-600/30 to-purple-600/20 blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 h-56 w-56 rounded-full bg-gradient-to-t from-amber-500/30 to-yellow-300/20 blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Golden sparks */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.h1
          className="bg-gradient-to-r from-white via-purple-100 to-amber-100 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-6 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-xl font-medium text-transparent sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          className="mt-10 flex space-x-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() =>
              document.dispatchEvent(new CustomEvent("open-login"))
            }
            className="rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-3 text-lg font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
          >
            Try Now
          </button>
          <button
            onClick={() => {
              document.dispatchEvent(
                new CustomEvent("open-login", {
                  detail: { redirectToDashboard: true },
                }),
              );
            }}
            className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 text-lg font-medium text-black shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/40"
          >
            Let's Generate The Prompt
          </button>
        </motion.div>
      </div>
    </div>
  );
}
