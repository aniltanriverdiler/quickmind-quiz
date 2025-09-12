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
import { NavLink, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, ScrollText, UserCheck } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const { currentUser, login, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-card dark:bg-background shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo + App Name */}
        <div className="flex flex-row gap-2 items-center">
          <img src="/brain.png" alt="brain" className="w-8 h-8" />
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-bold inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-500"
          >
            QuickMind
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              {/* Dropdown Menu for logged-in user */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    <UserCheck className="w-6 h-6" strokeWidth={3} />
                    {currentUser.name.split(" ")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* History Link */}
                  <DropdownMenuItem onClick={() => navigate("/history")}>
                    <ScrollText className="w-6 h-6" strokeWidth={3} /> History
                  </DropdownMenuItem>

                  {/* Logout */}
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      toast("👋 You have been logged out");
                    }}
                  >
                    <LogOut className="w-6 h-6" strokeWidth={3} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Login Dialog */}
              <Dialog open={openLogin} onOpenChange={setOpenLogin}>
                <DialogTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[950px] p-0 overflow-hidden rounded-2xl">
                  {/* Two column layout inspired by the provided mockup */}
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Image with subtle rounded frame */}
                    <div className="relative hidden md:block bg-black">
                      <img
                        src="/src/assets/login.jpg"
                        alt="login visual"
                        className="h-full w-full object-cover"
                      />
                      {/* Decorative rounded border effect */}
                      <div className="pointer-events-none absolute inset-4 rounded-3xl ring-1 ring-white/20"></div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-6 sm:p-10">
                      <DialogHeader className="space-y-1 pt-12">
                        <DialogTitle className="text-4xl font-semibold mb-2">
                          Log in
                        </DialogTitle>
                        <DialogDescription>
                          Don't have an account?{" "}
                          <button
                            type="button"
                            className="text-primary underline underline-offset-4"
                            onClick={() => {
                              // Close login, open register to mimic the example CTA
                              setOpenLogin(false);
                              setOpenRegister(true);
                            }}
                          >
                            Create an Account
                          </button>
                        </DialogDescription>
                      </DialogHeader>

                      {/* Login Form */}
                      <form
                        className="mt-6 grid gap-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const email = (
                            form.elements.namedItem("email") as HTMLInputElement
                          ).value;
                          const password = (
                            form.elements.namedItem(
                              "password"
                            ) as HTMLInputElement
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
                        {/* Email */}
                        <div className="grid gap-2">
                          <Label htmlFor="email-login">Email Address</Label>
                          <Input
                            id="email-login"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                          />
                        </div>

                        {/* Password + Forgot link */}
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password-login">Password</Label>
                            <button
                              type="button"
                              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <Input
                            id="password-login"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                          />
                        </div>

                        {/* Terms checkbox mimic */}
                        <label className="flex items-start gap-3 text-sm">
                          <Checkbox className="mt-1 h-4 w-4 rounded border" />
                          <span>
                            I agree to the{" "}
                            <a
                              className="underline underline-offset-4"
                              href="#"
                            >
                              Terms & Condition
                            </a>
                          </span>
                        </label>

                        {/* Primary action */}
                        <Button
                          type="submit"
                          className="w-full h-11 text-base mt-3"
                        >
                          Log in
                        </Button>

                        {/* Divider */}
                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              or
                            </span>
                          </div>
                        </div>

                        {/* Social buttons (visual only) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2"
                          >
                            <img
                              src="/src/assets/google-icon.png"
                              alt="google"
                              className="w-4 h-4"
                            />
                            Continue with Google
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2"
                          >
                            <img
                              src="/src/assets/facebook-icon.png"
                              alt="facebook"
                              className="w-4 h-4"
                            />
                            Continue with Facebook
                          </Button>
                        </div>

                        {/* Secondary actions */}
                        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <span>Back to</span>
                          <button
                            type="button"
                            className="underline underline-offset-4"
                            onClick={() => setOpenLogin(false)}
                          >
                            Home
                          </button>
                        </div>

                        {/* Footer actions inside form to align with layout */}
                        <div className="sr-only">
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Login</Button>
                          </DialogFooter>
                        </div>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Register Dialog */}
              <Dialog open={openRegister} onOpenChange={setOpenRegister}>
                <DialogTrigger asChild>
                  <Button variant="outline">Register</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[950px] p-0 overflow-hidden rounded-2xl">
                  {/* Two column layout to mirror login dialog */}
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Image */}
                    <div className="relative hidden md:block bg-black">
                      <img
                        src="/src/assets/register.jpg"
                        alt="register visual"
                        className="h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-4 rounded-3xl ring-1 ring-white/20"></div>
                    </div>

                    {/* Right: Form side */}
                    <div className="p-6 sm:p-10">
                      <DialogHeader className="space-y-1 pt-12">
                        <DialogTitle className="text-4xl font-semibold mb-2">
                          Create an Account
                        </DialogTitle>
                        <DialogDescription>
                          Already have an account?{" "}
                          <button
                            type="button"
                            className="text-primary underline underline-offset-4"
                            onClick={() => {
                              // Close register, open login for quick switching
                              setOpenRegister(false);
                              setOpenLogin(true);
                            }}
                          >
                            Log in
                          </button>
                        </DialogDescription>
                      </DialogHeader>

                      {/* Register Form to match the mockup */}
                      <form
                        className="mt-6 grid gap-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const firstName = (
                            form.elements.namedItem(
                              "firstName"
                            ) as HTMLInputElement
                          ).value;
                          const lastName = (
                            form.elements.namedItem(
                              "lastName"
                            ) as HTMLInputElement
                          ).value;
                          const email = (
                            form.elements.namedItem("email") as HTMLInputElement
                          ).value;
                          const password = (
                            form.elements.namedItem(
                              "password"
                            ) as HTMLInputElement
                          ).value;

                          const name = `${firstName} ${lastName}`.trim();

                          useAuthStore
                            .getState()
                            .register({ name, email, password });
                          toast.success("🎉 Registration successful!");
                          setOpenRegister(false);
                        }}
                      >
                        {/* Name row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="John"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                          <Label htmlFor="email-register">Email Address</Label>
                          <Input
                            id="email-register"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                          />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                          <Label htmlFor="password-register">Password</Label>
                          <Input
                            id="password-register"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 text-sm">
                          <Checkbox className="mt-1 h-4 w-4 rounded border" />
                          <span>
                            I agree to the{" "}
                            <a
                              className="underline underline-offset-4"
                              href="#"
                            >
                              Terms & Condition
                            </a>
                          </span>
                        </label>

                        {/* Primary */}
                        <Button
                          type="submit"
                          className="w-full h-11 text-base mt-3"
                        >
                          Create Account
                        </Button>

                        {/* Divider */}
                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              or
                            </span>
                          </div>
                        </div>

                        {/* Socials */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2"
                          >
                            <img
                              src="/src/assets/google-icon.png"
                              alt="google"
                              className="w-4 h-4"
                            />
                            Continue with Google
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2"
                          >
                            <img
                              src="/src/assets/facebook-icon.png"
                              alt="facebook"
                              className="w-4 h-4"
                            />
                            Continue with Facebook
                          </Button>
                        </div>
                      </form>
                    </div>
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
