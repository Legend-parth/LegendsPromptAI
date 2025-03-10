import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Globe() {
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
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Globe parameters
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Points on the globe
    const points: {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
    }[] = [];
    const numPoints = 200;

    for (let i = 0; i < numPoints; i++) {
      // Random spherical coordinates
      const theta = Math.random() * Math.PI * 2; // longitude
      const phi = Math.acos(2 * Math.random() - 1); // latitude

      // Convert to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Random size and gold color variations
      const size = Math.random() * 2 + 1;
      const colors = [
        "rgba(251, 191, 36, 0.8)", // amber-500
        "rgba(252, 211, 77, 0.8)", // amber-300
        "rgba(245, 158, 11, 0.8)", // amber-600
        "rgba(250, 204, 21, 0.8)", // yellow-400
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      points.push({ x, y, z, size, color });
    }

    // Animation variables
    let rotationX = 0;
    let rotationY = 0;
    let rotationSpeed = 0.003;

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update rotation
      rotationY += rotationSpeed;

      // Sort points by z-coordinate for proper depth rendering
      const sortedPoints = [...points]
        .map((point) => {
          // Apply rotation around Y axis
          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);

          const x = point.x * cosY - point.z * sinY;
          const z = point.z * cosY + point.x * sinY;

          // Apply rotation around X axis
          const cosX = Math.cos(rotationX);
          const sinX = Math.sin(rotationX);

          const y = point.y * cosX - z * sinX;
          const newZ = z * cosX + point.y * sinX;

          return {
            ...point,
            x,
            y,
            z: newZ,
            screenX: centerX + x,
            screenY: centerY + y,
          };
        })
        .sort((a, b) => a.z - b.z);

      // Draw globe outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.2)"; // amber-500 with low opacity
      ctx.stroke();

      // Draw points
      sortedPoints.forEach((point) => {
        const opacity = (point.z + radius) / (radius * 2); // Higher opacity for points in front

        ctx.beginPath();
        ctx.arc(
          point.screenX,
          point.screenY,
          point.size * opacity,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = point.color.replace(/[^,]+\)/, `${opacity})`);
        ctx.fill();
      });

      // Draw connections between close points
      ctx.lineWidth = 0.5;
      for (let i = 0; i < sortedPoints.length; i++) {
        for (let j = i + 1; j < sortedPoints.length; j++) {
          const p1 = sortedPoints[i];
          const p2 = sortedPoints[j];

          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) +
              Math.pow(p1.y - p2.y, 2) +
              Math.pow(p1.z - p2.z, 2),
          );

          if (distance < radius * 0.5) {
            const opacity = (1 - distance / (radius * 0.5)) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    // Handle mouse/touch interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      if ("touches" in e) {
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      } else {
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      let currentX, currentY;
      if ("touches" in e) {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      } else {
        currentX = e.clientX;
        currentY = e.clientY;
      }

      const deltaX = currentX - previousMouseX;
      const deltaY = currentY - previousMouseY;

      rotationY += deltaX * 0.005;
      rotationX += deltaY * 0.005;

      previousMouseX = currentX;
      previousMouseY = currentY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div className="relative h-[400px] md:h-[600px] w-full mx-auto overflow-hidden">
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-md px-4">
          <h3 className="mb-2 text-2xl font-semibold text-white">
            Global Access
          </h3>
          <p className="text-gray-300">
            Join thousands of users worldwide enhancing their prompts with our
            AI technology
          </p>
        </div>
      </motion.div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
