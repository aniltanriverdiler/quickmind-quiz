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
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // Getting required fields from Zustand store
  const { currentUser, login, logout } = useAuthStore();

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Game Image and Name */}
        <div className="flex flex-row gap-2">
          <img className="" src="src/assets/brain.png" alt="brain" />
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-800 dark:text-gray-100"
          >
            QuickMind
          </NavLink>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              {/* User Name */}
              <span className="text-gray-700 dark:text-gray-200">
                👤 {currentUser.name}
              </span>

              {/* Logout Button */}
              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                  toast("👋 You have been logged out");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login Dialog */}
              <Dialog open={openLogin} onOpenChange={setOpenLogin}>
                <DialogTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center text-3xl mb-2">
                      Login
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Access your account to continue the quiz.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Login Form */}
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const email = (
                        form.elements.namedItem("email") as HTMLInputElement
                      ).value;
                      const password = (
                        form.elements.namedItem("password") as HTMLInputElement
                      ).value;

                      const success = login(email, password);

                      if (success) {
                        toast.success(`👋 Welcome back, ${email}!`);
                        setOpenLogin(false);
                      } else {
                        toast.error("❌ Incorrect email or password");
                      }
                    }}
                  >
                    <div className="grid gap-3">
                      <Label htmlFor="email-login">Email:</Label>
                      <Input
                        id="email-login"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password-login">Password:</Label>
                      <Input
                        id="password-login"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Login</Button>
                    </DialogFooter>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Don’t have an account?{" "}
                      <span className="font-semibold text-black">Register</span>
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Register Dialog */}
              <Dialog open={openRegister} onOpenChange={setOpenRegister}>
                <DialogTrigger asChild>
                  <Button variant="outline">Register</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center text-3xl mb-2">
                      Register
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Create your account to track your quiz scores.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Register Form */}
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const name = (
                        form.elements.namedItem("name") as HTMLInputElement
                      ).value;
                      const email = (
                        form.elements.namedItem("email") as HTMLInputElement
                      ).value;
                      const password = (
                        form.elements.namedItem("password") as HTMLInputElement
                      ).value;

                      useAuthStore
                        .getState()
                        .register({ name, email, password });

                      toast.success("🎉 Registration successful!");
                      setOpenRegister(false);
                    }}
                  >
                    <div className="grid gap-3">
                      <Label htmlFor="name">Username:</Label>
                      <Input id="name" name="name" placeholder="Username" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email:</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password">Password:</Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="passwordConfirm">Confirm password:</Label>
                      <Input
                        type="password"
                        id="passwordConfirm"
                        placeholder="Confirm password"
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Register</Button>
                    </DialogFooter>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Already have an account?{" "}
                      <span className="font-semibold text-black">Login</span>
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {/* Dark Mode Switch */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
