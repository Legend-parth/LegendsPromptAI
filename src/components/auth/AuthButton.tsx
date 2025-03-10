import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import { LogIn, LogOut, User } from "lucide-react";

export default function AuthButton() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  if (user) {
    return (
      <Button
        onClick={handleSignOut}
        variant="outline"
        className="border-purple-800/30 bg-purple-950/20 text-white hover:bg-purple-900/30"
      >
        <LogOut className="mr-2 h-4 w-4 text-amber-400" />
        Sign Out
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-purple-800/30 bg-purple-950/20 text-white hover:bg-purple-900/30"
        >
          <LogIn className="mr-2 h-4 w-4 text-amber-400" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-none bg-transparent p-0">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
