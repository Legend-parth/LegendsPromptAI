import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Prompt {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

interface PromptListProps {
  prompts: Prompt[];
  onDownload: (prompt: Prompt) => void;
}

export default function PromptList({ prompts, onDownload }: PromptListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(prompts.map((prompt) => prompt.category))];

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? prompt.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-400" />
          <Input
            type="text"
            placeholder="Search prompts..."
            className="pl-9 bg-purple-950/20 border-purple-800/30 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className={`cursor-pointer ${selectedCategory === null ? "bg-purple-600" : "bg-transparent hover:bg-purple-900/20"}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${selectedCategory === category ? "bg-purple-600" : "bg-transparent hover:bg-purple-900/20"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {filteredPrompts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No prompts found matching your criteria
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-lg border border-purple-800/20 bg-purple-950/10 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{prompt.title}</h3>
                  <div className="mt-1 flex items-center space-x-3 text-sm text-gray-400">
                    <span>{new Date(prompt.date).toLocaleDateString()}</span>
                    <div className="flex items-center">
                      <Tag className="mr-1 h-3 w-3 text-amber-400" />
                      <span>{prompt.category}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    {prompt.content
                      .split("\n")[0]
                      .replace("#", "")
                      .trim()
                      .substring(0, 100)}
                    ...
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                  onClick={() => onDownload(prompt)}
                >
                  <Download className="h-4 w-4 text-amber-400" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
