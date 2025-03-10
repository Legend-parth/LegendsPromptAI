import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Mock data for the chart
const mockData = [
  { month: "Jan", count: 320 },
  { month: "Feb", count: 350 },
  { month: "Mar", count: 290 },
  { month: "Apr", count: 400 },
  { month: "May", count: 380 },
  { month: "Jun", count: 420 },
  { month: "Jul", count: 450 },
  { month: "Aug", count: 500 },
  { month: "Sep", count: 480 },
  { month: "Oct", count: 520 },
  { month: "Nov", count: 540 },
  { month: "Dec", count: 580 },
];

export default function AnalyticsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawChart();
    };

    const drawChart = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Chart dimensions
      const padding = 40;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;
      const maxValue = Math.max(...mockData.map((d) => d.count)) * 1.1; // Add 10% padding

      // Draw axes
      ctx.beginPath();
      ctx.strokeStyle = "rgba(251, 191, 36, 0.3)"; // amber with low opacity
      ctx.lineWidth = 1;
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();

      // Draw grid lines
      const gridLines = 5;
      ctx.textAlign = "right";
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";

      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (chartHeight / gridLines) * i;
        const value = Math.round(maxValue - (maxValue / gridLines) * i);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(251, 191, 36, 0.1)";
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();

        ctx.fillText(value.toString(), padding - 5, y + 3);
      }

      // Draw bars
      const barWidth = (chartWidth / mockData.length) * 0.7;
      const barSpacing = (chartWidth / mockData.length) * 0.3;

      mockData.forEach((item, index) => {
        const x =
          padding + (chartWidth / mockData.length) * index + barSpacing / 2;
        const barHeight = (item.count / maxValue) * chartHeight;
        const y = canvas.height - padding - barHeight;

        // Bar gradient
        const gradient = ctx.createLinearGradient(
          x,
          y,
          x,
          canvas.height - padding,
        );
        gradient.addColorStop(0, "rgba(251, 191, 36, 0.8)"); // amber-500
        gradient.addColorStop(1, "rgba(252, 211, 77, 0.3)"); // amber-300

        // Draw bar
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        // Draw month label
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText(
          item.month,
          x + barWidth / 2,
          canvas.height - padding + 15,
        );

        // Draw value on top of bar
        if (barHeight > 20) {
          // Only show if bar is tall enough
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5);
        }
      });
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </motion.div>
    </div>
  );
}
