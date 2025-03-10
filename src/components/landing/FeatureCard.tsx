import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  index?: number;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  index = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-purple-800/20 bg-gradient-to-br from-black/60 via-purple-950/30 to-blue-950/20 p-6 backdrop-blur-sm shadow-lg",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-600/20 to-fuchsia-600/5 blur-xl" />
      <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-tr from-amber-500/10 to-yellow-400/5 blur-xl" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-purple-900/30 p-3 text-amber-400">
          {Icon && typeof Icon !== "number" && <Icon className="h-6 w-6" />}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}
