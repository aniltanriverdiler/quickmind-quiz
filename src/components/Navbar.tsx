import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ModeToggle from "./ModeToggle";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Game Image and Name */}
        <div className="flex flex-row gap-2">
          <img className="" src="src/assets/brain.png" alt="brain" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            QuickMind
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* Login Dialog */}
          <Dialog open={openLogin} onOpenChange={setOpenLogin}>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-3xl mb-2">
                    Login
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Username:</Label>
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue="Anıl Tanrıverdiler"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Password:</Label>
                    <Input
                      type="password"
                      id="username-1"
                      name="username"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Login</Button>
                </DialogFooter>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <span className="font-semibold text-black">Register</span>
                  </p>
                </div>
              </DialogContent>
            </form>
          </Dialog>

          {/* Register Dialog */}
          <Dialog open={openRegister} onOpenChange={setOpenRegister}>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">Register</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-3xl mb-2">
                    Register
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Username:</Label>
                    <Input id="name-1" name="name" placeholder="Username" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Email:</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Password:</Label>
                    <Input
                      type="password"
                      id="password-1"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Confirm password:</Label>
                    <Input
                      type="password"
                      id="password-2"
                      name="password"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Register</Button>
                </DialogFooter>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <span className="font-semibold text-black">Login</span>
                  </p>
                </div>
              </DialogContent>
            </form>
          </Dialog>

          {/* Dark Mode Switch Placeholder */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
