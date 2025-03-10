import { Brain, Sparkles, Infinity, Gift } from "lucide-react";
import HeroGeometric from "./HeroGeometric";
import FeatureCard from "./FeatureCard";
import Globe from "./Globe";
import Navbar from "./Navbar";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "../auth/LoginForm";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleTryNowClick = () => {
    setLoginOpen(true);
  };

  // Listen for custom event from HeroGeometric component
  React.useEffect(() => {
    const handleOpenLogin = (event: any) => {
      setLoginOpen(true);
      // Store redirect info in sessionStorage if needed
      if (event.detail?.redirectToDashboard) {
        sessionStorage.setItem("redirectAfterLogin", "/dashboard");
      }
    };
    document.addEventListener("open-login", handleOpenLogin);
    return () => document.removeEventListener("open-login", handleOpenLogin);
  }, []);
  const features = [
    {
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI analyzes your prompts to identify areas for improvement and enhancement.",
      icon: Brain,
    },
    {
      title: "Detailed Output Generation",
      description:
        "Get comprehensive, detailed outputs that exceed expectations and deliver exceptional results.",
      icon: Sparkles,
    },
    {
      title: "Unlimited Usage",
      description:
        "Use our tool as much as you need with no restrictions or hidden limitations.",
      icon: Infinity,
    },
    {
      title: "Free Lifetime Access",
      description:
        "Enjoy all premium features completely free with lifetime access to our platform.",
      icon: Gift,
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-purple-950/40 to-blue-950/50 text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #000000, #1e0b30, #0f0b36, #0a0d2a, #000000), radial-gradient(circle at top right, rgba(255, 215, 0, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(138, 43, 226, 0.2), transparent 50%)",
      }}
    >
      <Navbar />
      {/* Hero Section */}
      <HeroGeometric />

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Premium Features, <span className="text-amber-300">Zero Cost</span>
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Prompts?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Join thousands of users who are already creating better content with
            our AI-powered prompt enhancement tool.
          </p>
          <button
            onClick={handleTryNowClick}
            className="rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 px-8 py-3 text-lg font-medium text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30 border border-amber-300/20"
          >
            Try Now — It's Free
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet Our <span className="text-amber-300">Team</span>
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
            {/* Team Member 1 */}
            <motion.div
              className="relative overflow-hidden rounded-xl border border-purple-800/20 bg-gradient-to-br from-black/60 via-purple-950/30 to-blue-950/20 p-6 backdrop-blur-sm shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mb-1">
                  Parth Gajera
                </h3>
                <p className="text-amber-400 mb-3">Developer</p>
                <p className="text-gray-300 text-sm">
                  Full-stack developer with expertise in AI integration and
                  prompt engineering.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              className="relative overflow-hidden rounded-xl border border-purple-800/20 bg-gradient-to-br from-black/60 via-purple-950/30 to-blue-950/20 p-6 backdrop-blur-sm shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mb-1">
                  Devarsh Patel
                </h3>
                <p className="text-amber-400 mb-3">Developer</p>
                <p className="text-gray-300 text-sm">
                  Backend specialist with focus on scalable architecture and
                  data processing.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              className="relative overflow-hidden rounded-xl border border-purple-800/20 bg-gradient-to-br from-black/60 via-purple-950/30 to-blue-950/20 p-6 backdrop-blur-sm shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mb-1">
                  Aalind Tiwari
                </h3>
                <p className="text-amber-400 mb-3">Partner</p>
                <p className="text-gray-300 text-sm">
                  Strategic partner overseeing business development and product
                  vision.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="py-16 flex justify-center items-center">
        <div className="w-full max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Global <span className="text-amber-300">Access</span>
          </h2>
          <Globe />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-400">
          <p>© 2023 LegendsPromptAI. All rights reserved.</p>
          <p className="mt-2">
            Support:{" "}
            <a
              href="mailto:support@botme.tech"
              className="text-amber-400 hover:text-amber-300"
            >
              support@botme.tech
            </a>
          </p>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
