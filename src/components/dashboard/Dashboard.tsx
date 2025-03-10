import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Download,
  BarChart2,
  Calendar,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react";
import PromptList from "./PromptList";
import AnalyticsChart from "./AnalyticsChart";
import PromptGenerator from "./PromptGenerator";

// Mock data for the dashboard
const mockAnalytics = {
  day: 12,
  week: 87,
  month: 342,
  year: 4218,
};

const mockPrompts = [
  {
    id: "1",
    title: "Product Description for Eco-Friendly Water Bottle",
    content:
      "# Eco-Friendly Water Bottle\n\nIntroducing our revolutionary eco-friendly water bottle, crafted from sustainable materials that reduce environmental impact without compromising on quality or design. This sleek, durable bottle features double-wall insulation to keep your beverages at the perfect temperature for hours.\n\n## Key Features\n\n- **Sustainable Materials**: Made from 100% recycled stainless steel\n- **Temperature Control**: Keeps drinks cold for 24 hours or hot for 12 hours\n- **Leak-Proof Design**: Secure seal prevents any spills in your bag\n- **Ergonomic Shape**: Comfortable grip for easy carrying\n\nPerfect for environmentally conscious consumers who don't want to sacrifice style or functionality.",
    date: "2023-06-15",
    category: "Product",
  },
  {
    id: "2",
    title: "AI Research Assistant Job Description",
    content:
      "# AI Research Assistant Position\n\nWe are seeking a talented and motivated AI Research Assistant to join our innovative team. The ideal candidate will support senior researchers in developing cutting-edge artificial intelligence solutions that push the boundaries of what's possible in machine learning and natural language processing.\n\n## Responsibilities\n\n- Assist in designing and implementing machine learning models\n- Collect and preprocess data for training and evaluation\n- Conduct literature reviews on state-of-the-art AI techniques\n- Document research findings and contribute to technical reports\n- Collaborate with cross-functional teams to integrate AI solutions\n\n## Requirements\n\n- Bachelor's degree in Computer Science, Mathematics, or related field\n- Strong programming skills in Python and familiarity with ML frameworks\n- Basic understanding of machine learning concepts and algorithms\n- Excellent analytical and problem-solving abilities\n- Strong communication skills and ability to work in a team environment",
    date: "2023-07-22",
    category: "Job",
  },
  {
    id: "3",
    title: "Weekly Team Update Email",
    content:
      "# Weekly Team Update: Project Phoenix Progress\n\nDear Team,\n\nI hope this email finds you well. I wanted to provide a quick update on our progress with Project Phoenix this week.\n\n## Achievements\n\n- Successfully completed the user authentication module ahead of schedule\n- Fixed 12 critical bugs in the payment processing system\n- Improved page load speed by 40% through code optimization\n- Onboarded two new team members who are already making valuable contributions\n\n## Challenges\n\n- We're still experiencing some issues with the third-party API integration\n- The client has requested additional features that may impact our timeline\n\n## Next Week's Focus\n\n- Complete the reporting dashboard with all requested visualizations\n- Begin work on the mobile responsive design\n- Schedule a mid-project review with the client\n\nPlease let me know if you have any questions or concerns. Your hard work and dedication are greatly appreciated!\n\nBest regards,\nAlex",
    date: "2023-08-05",
    category: "Email",
  },
  {
    id: "4",
    title: "Social Media Post for New Service Launch",
    content:
      "# Social Media Announcement: New Service Launch\n\n🚀 **EXCITING NEWS!** 🚀\n\nWe're thrilled to announce the launch of our newest service: **AI-Powered Content Optimization**!\n\nTransform your content from good to exceptional with our advanced AI tools that analyze, enhance, and optimize your writing for maximum impact.\n\n## What Our Service Offers:\n\n✅ Sentiment analysis to perfect your tone\n✅ Readability scoring and improvements\n✅ SEO optimization for better visibility\n✅ Audience engagement predictions\n\nPerfect for marketers, content creators, and businesses looking to stand out in a crowded digital landscape.\n\n**Early Bird Special:** Get 30% off if you sign up in the next 48 hours!\n\nLink in bio to learn more. #ContentOptimization #AITools #DigitalMarketing",
    date: "2023-09-10",
    category: "Social",
  },
  {
    id: "5",
    title: "Customer Support Response Template",
    content:
      "# Customer Support Response Template\n\nDear [Customer Name],\n\nThank you for reaching out to our support team. I understand you're experiencing an issue with [specific problem], and I want to assure you that we're here to help resolve this as quickly as possible.\n\n## What We Understand\n\nBased on your description, you're encountering [restate the problem in clear terms]. This is certainly frustrating, and I appreciate your patience as we work through this together.\n\n## Immediate Steps\n\n1. Please try [first troubleshooting step] as this resolves the issue in many cases\n2. If that doesn't work, [second troubleshooting step]\n3. You can also check our knowledge base article at [link] for additional guidance\n\n## What We're Doing\n\nI've documented this issue in our system (reference #[TICKET-ID]). If the steps above don't resolve your problem, our technical team will investigate further.\n\n## Next Steps\n\nPlease let me know if the suggested solutions help. If not, we may need to [collect additional information/schedule a call/escalate to a specialist].\n\nWe value you as a customer and are committed to providing you with the best possible experience with our product.\n\nBest regards,\n[Your Name]\nCustomer Support Specialist",
    date: "2023-10-18",
    category: "Support",
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    // Redirect to home if not logged in
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  if (showGenerator) {
    return <PromptGenerator onBack={() => setShowGenerator(false)} />;
  }

  const downloadPromptAsMd = (prompt) => {
    const blob = new Blob([prompt.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user.email?.split("@")[0]}
              </h1>
              <p className="text-gray-400">Manage your AI-enhanced prompts</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowGenerator(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Let's Generate The Prompts
              </Button>
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="border-purple-800/30 bg-purple-950/20 hover:bg-purple-900/30"
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-purple-800/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold text-amber-400">
                    {mockAnalytics.day}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Prompts generated today
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-800/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold text-amber-400">
                    {mockAnalytics.week}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Prompts generated this week
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-800/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold text-amber-400">
                    {mockAnalytics.month}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Prompts generated this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-800/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  This Year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold text-amber-400">
                    {mockAnalytics.year}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Prompts generated this year
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Tabs
              defaultValue="analytics"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-purple-950/20">
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-purple-800/30"
                >
                  <BarChart2 className="mr-2 h-4 w-4 text-amber-400" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="prompts"
                  className="data-[state=active]:bg-purple-800/30"
                >
                  <FileText className="mr-2 h-4 w-4 text-amber-400" />
                  Saved Prompts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="mt-6">
                <Card className="border-purple-800/20 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Prompt Generation Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AnalyticsChart />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prompts" className="mt-6">
                <Card className="border-purple-800/20 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Your Saved Prompts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PromptList
                      prompts={mockPrompts}
                      onDownload={downloadPromptAsMd}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
