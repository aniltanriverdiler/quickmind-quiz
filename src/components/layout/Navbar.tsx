import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ModeToggle from "./ModeToggle";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BrainCog, LogOut } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const { currentUser, login, logout } = useAuthStore();

  return (
    <nav className="w-full sticky top-0 z-50 border-white/10 bg-transparent backdrop-blur-none">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo + App Name */}
        <div className="flex flex-row gap-2 items-center">
          <NavLink to="/">
            <BrainCog className="w-7 h-7 font-extrabold text-indigo-500 mt-1 drop-shadow" />
          </NavLink>
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-bold inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
          >
            QuickMind
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              {/* Authenticated: primary nav links */}
              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  Leaderboard
                </NavLink>
                <NavLink
                  to="/achievements"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  Achievements
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  Settings
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  About
                </NavLink>
              </div>

              {/* Dropdown Menu for logged-in user: avatar + name */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white font-semibold hover:bg-white/10 "
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-900 text-white flex items-center justify-center font-semibold">
                        {currentUser.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span>{currentUser.name.split(" ")[0]}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-44 backdrop-blur-md bg-white/10 border-white/20 rounded-lg"
                >
                  <DropdownMenuLabel className="text-white font-semibold">
                    Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem
                    className="text-white/80 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                    onClick={() => {
                      logout();
                      toast("👋 You have been logged out");
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" strokeWidth={2} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Guest: primary nav links */}
              <div className="flex items-center gap-2 text-sm">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 ${
                      isActive ? "text-white" : "text-white/80"
                    } hover:text-white transition-colors`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="#login"
                  onClick={() => setOpenLogin(true)}
                  className={`px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="#register"
                  onClick={() => setOpenRegister(true)}
                  className={`px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors`}
                >
                  Register
                </NavLink>
              </div>

              {/* Login Dialog (opened via link) */}
              <Dialog open={openLogin} onOpenChange={setOpenLogin}>
                <DialogContent className="sm:max-w-[950px] p-0 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border-white/20">
                  {/* Close button */}
                  <button
                    onClick={() => setOpenLogin(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    aria-label="Close dialog"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {/* Two column layout inspired by the provided mockup */}
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Image with subtle rounded frame */}
                    <div className="relative hidden md:block bg-black">
                      <img
                        src="/login.jpg"
                        alt="login visual"
                        className="h-full w-full object-cover"
                      />
                      {/* Decorative rounded border effect */}
                      <div className="pointer-events-none absolute inset-4 rounded-3xl ring-1 ring-white/20"></div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-6 sm:p-10">
                      <DialogHeader className="space-y-1 pt-12">
                        <DialogTitle className="text-4xl font-semibold mb-2 text-white">
                          Log in
                        </DialogTitle>
                        <DialogDescription className="text-white/80">
                          Don't have an account?{" "}
                          <button
                            type="button"
                            className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
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
                          <Label
                            htmlFor="email-login"
                            className="text-white font-semibold"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email-login"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                          />
                        </div>

                        {/* Password + Forgot link */}
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="password-login"
                              className="text-white font-semibold"
                            >
                              Password
                            </Label>
                            <button
                              type="button"
                              className="text-sm text-white/60 hover:text-white underline underline-offset-4 transition-colors"
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <Input
                            id="password-login"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                          />
                        </div>

                        {/* Terms checkbox mimic */}
                        <label className="flex items-start gap-3 text-sm text-white/80">
                          <Checkbox className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10" />
                          <span>
                            I agree to the{" "}
                            <a
                              className="underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors"
                              href="#"
                            >
                              Terms & Condition
                            </a>
                          </span>
                        </label>

                        {/* Primary action */}
                        <Button
                          type="submit"
                          className="w-full h-11 text-base mt-3 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/40 transition-all duration-200"
                        >
                          Log in
                        </Button>

                        {/* Divider */}
                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/20" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/10 px-2 text-white/60">
                              or
                            </span>
                          </div>
                        </div>

                        {/* Social buttons (visual only) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                          >
                            <img
                              src="/google-icon.png"
                              alt="google"
                              className="w-4 h-4"
                            />
                            Continue with Google
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                          >
                            <img
                              src="/facebook-icon.png"
                              alt="facebook"
                              className="w-4 h-4"
                            />
                            Continue with Facebook
                          </Button>
                        </div>

                        {/* Secondary actions */}
                        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/60">
                          <span>Back to</span>
                          <button
                            type="button"
                            className="underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors"
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

              {/* Register Dialog (opened via link) */}
              <Dialog open={openRegister} onOpenChange={setOpenRegister}>
                <DialogContent className="sm:max-w-[950px] p-0 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border-white/20">
                  {/* Close button */}
                  <button
                    onClick={() => setOpenRegister(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    aria-label="Close dialog"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {/* Two column layout to mirror login dialog */}
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Image */}
                    <div className="relative hidden md:block bg-black">
                      <img
                        src="/register.jpg"
                        alt="register visual"
                        className="h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-4 rounded-3xl ring-1 ring-white/20"></div>
                    </div>

                    {/* Right: Form side */}
                    <div className="p-6 sm:p-10">
                      <DialogHeader className="space-y-1 pt-12">
                        <DialogTitle className="text-4xl font-semibold mb-2 text-white">
                          Create an Account
                        </DialogTitle>
                        <DialogDescription className="text-white/80">
                          Already have an account?{" "}
                          <button
                            type="button"
                            className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
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
                            <Label
                              htmlFor="firstName"
                              className="text-white font-semibold"
                            >
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="John"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label
                              htmlFor="lastName"
                              className="text-white font-semibold"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Doe"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                          <Label
                            htmlFor="email-register"
                            className="text-white font-semibold"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email-register"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                          />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                          <Label
                            htmlFor="password-register"
                            className="text-white font-semibold"
                          >
                            Password
                          </Label>
                          <Input
                            id="password-register"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                          />
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 text-sm text-white/80">
                          <Checkbox className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10" />
                          <span>
                            I agree to the{" "}
                            <a
                              className="underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors"
                              href="#"
                            >
                              Terms & Condition
                            </a>
                          </span>
                        </label>

                        {/* Primary */}
                        <Button
                          type="submit"
                          className="w-full h-11 text-base mt-3 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/40 transition-all duration-200"
                        >
                          Create Account
                        </Button>

                        {/* Divider */}
                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/20" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/10 px-2 text-white/60">
                              or
                            </span>
                          </div>
                        </div>

                        {/* Socials */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                          >
                            <img
                              src="/google-icon.png"
                              alt="google"
                              className="w-4 h-4"
                            />
                            Continue with Google
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full px-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                          >
                            <img
                              src="/facebook-icon.png"
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
