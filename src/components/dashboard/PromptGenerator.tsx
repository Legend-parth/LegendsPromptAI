import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Download, Copy, ArrowLeft } from "lucide-react";

interface PromptGeneratorProps {
  onBack: () => void;
}

export default function PromptGenerator({ onBack }: PromptGeneratorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    devType: "",
    projectIdea: "",
    targetAudience: "",
    keyFeatures: "",
    outputMethod: "",
    fileName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Generate the prompt content
    const promptContent = `# ${formData.projectName} Project Brief

## Development Type
${formData.devType}

## Project Idea
${formData.projectIdea}

## Target Audience
${formData.targetAudience}

## Key Features
${formData.keyFeatures
  .split(",")
  .map((feature) => `- ${feature.trim()}`)
  .join("\n")}
`;

    if (formData.outputMethod === "d") {
      // Download as file
      const blob = new Blob([promptContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.fileName || formData.projectName.replace(/\s+/g, "-").toLowerCase()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(promptContent);
      alert("Prompt copied to clipboard!");
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #000000, #1e0b30, #0f0b36, #0a0d2a, #000000), radial-gradient(circle at top right, rgba(255, 215, 0, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(138, 43, 226, 0.2), transparent 50%)",
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-amber-400 hover:text-amber-300 hover:bg-purple-900/20 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Prompt Generator</h1>
          </div>

          <div className="rounded-xl border border-purple-800/20 bg-black/40 backdrop-blur-sm p-8 shadow-lg">
            <div className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label
                      htmlFor="projectName"
                      className="text-amber-400 flex items-center text-lg mb-2"
                    >
                      📝 Enter Project Name:
                    </Label>
                    <Input
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="bg-purple-950/20 border-purple-800/30 text-white"
                      placeholder="E.g. E-commerce Website Redesign"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="devType"
                      className="text-amber-400 flex items-center text-lg mb-2"
                    >
                      🖥️ Enter Development Type:
                    </Label>
                    <select
                      id="devType"
                      name="devType"
                      value={formData.devType}
                      onChange={handleChange}
                      className="w-full rounded-md bg-purple-950/20 border-purple-800/30 text-white p-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select development type
                      </option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Desktop Software">Desktop Software</option>
                      <option value="AI/ML Solution">AI/ML Solution</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Game Development">Game Development</option>
                      <option value="IoT Application">IoT Application</option>
                      <option value="Blockchain/Web3">Blockchain/Web3</option>
                      <option value="API/Backend Service">
                        API/Backend Service
                      </option>
                      <option value="Cross-platform App">
                        Cross-platform App
                      </option>
                    </select>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700"
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label
                      htmlFor="projectIdea"
                      className="text-amber-400 flex items-center text-lg mb-2"
                    >
                      💡 Provide Detailed Project Idea:
                    </Label>
                    <Textarea
                      id="projectIdea"
                      name="projectIdea"
                      value={formData.projectIdea}
                      onChange={handleChange}
                      className="bg-purple-950/20 border-purple-800/30 text-white min-h-[120px]"
                      placeholder="Describe your project in detail..."
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="targetAudience"
                      className="text-amber-400 flex items-center text-lg mb-2"
                    >
                      👥 Describe Target Audience:
                    </Label>
                    <Textarea
                      id="targetAudience"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleChange}
                      className="bg-purple-950/20 border-purple-800/30 text-white"
                      placeholder="Who is this project for?"
                    />
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="border-purple-800/30 bg-purple-950/20 text-white hover:bg-purple-900/30"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700"
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label
                      htmlFor="keyFeatures"
                      className="text-amber-400 flex items-center text-lg mb-2"
                    >
                      ✨ List Key Features (comma-separated):
                    </Label>
                    <Textarea
                      id="keyFeatures"
                      name="keyFeatures"
                      value={formData.keyFeatures}
                      onChange={handleChange}
                      className="bg-purple-950/20 border-purple-800/30 text-white"
                      placeholder="Feature 1, Feature 2, Feature 3..."
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="outputMethod"
                      className="text-amber-400 flex items-center text-lg mb-2"
                    >
                      📦 Output Method - Download (d) or Clipboard (c)?
                    </Label>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant={
                          formData.outputMethod === "d" ? "default" : "outline"
                        }
                        className={
                          formData.outputMethod === "d"
                            ? "bg-amber-500 text-black"
                            : "border-purple-800/30 bg-purple-950/20 text-white"
                        }
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            outputMethod: "d",
                          }))
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        type="button"
                        variant={
                          formData.outputMethod === "c" ? "default" : "outline"
                        }
                        className={
                          formData.outputMethod === "c"
                            ? "bg-amber-500 text-black"
                            : "border-purple-800/30 bg-purple-950/20 text-white"
                        }
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            outputMethod: "c",
                          }))
                        }
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Clipboard
                      </Button>
                    </div>
                  </div>

                  {formData.outputMethod === "d" && (
                    <div>
                      <Label
                        htmlFor="fileName"
                        className="text-amber-400 flex items-center text-lg mb-2"
                      >
                        🏷️ Enter File name to save with:
                      </Label>
                      <Input
                        id="fileName"
                        name="fileName"
                        value={formData.fileName}
                        onChange={handleChange}
                        className="bg-purple-950/20 border-purple-800/30 text-white"
                        placeholder={
                          formData.projectName
                            ? formData.projectName
                                .replace(/\s+/g, "-")
                                .toLowerCase()
                            : "project-brief"
                        }
                      />
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="border-purple-800/30 bg-purple-950/20 text-white hover:bg-purple-900/30"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700"
                      disabled={!formData.outputMethod}
                    >
                      Generate Prompt
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
