import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border border-purple-800/20 bg-black/40 backdrop-blur-sm text-white">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-purple-900/50 flex items-center justify-center">
              <User className="h-10 w-10 text-amber-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            User Profile
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-950/20 border border-purple-800/30">
            <h3 className="font-medium text-purple-200 mb-1">
              Account Details
            </h3>
            <p className="text-sm text-gray-300">Email: {user.email}</p>
            <p className="text-sm text-gray-300">
              User ID: {user.id.substring(0, 8)}...
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => signOut()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
