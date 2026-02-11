// app/auth/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

// Login Form Types
interface LoginData {
  email: string;
  password: string;
}

// Register Form Types
interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login Form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginData>();

  // Register Form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm<RegisterData>();

  const password = watch("password");

  const onLogin = async (data: LoginData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login:", data);
    setIsLoading(false);
  };

  const onRegister = async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Register:", data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-inter-reguler">
      <Card className="w-full max-w-md bg-zinc-950 border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-inter-bold text-white">
            Welcome to Splitwise
          </CardTitle>
          <CardDescription className="text-zinc-400 font-inter-light-betaa">
            Manage your expenses with friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-white/10 mb-6">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 font-inter-bold"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 font-inter-bold"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="login-email"
                    className="text-white font-inter-bold"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler"
                      {...registerLogin("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-xs text-red-400 font-inter-beta">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="login-password"
                      className="text-white font-inter-bold"
                    >
                      Password
                    </Label>
                    <Link
                      href="/forgot"
                      className="text-xs text-zinc-400 hover:text-white font-inter-beta"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler"
                      {...registerLogin("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 characters" },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-xs text-red-400 font-inter-beta">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 font-inter-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <form
                onSubmit={handleRegisterSubmit(onRegister)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="reg-username"
                    className="text-white font-inter-bold"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="reg-username"
                      type="text"
                      placeholder="johndoe"
                      className="pl-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler"
                      {...registerRegister("username", {
                        required: "Username is required",
                        minLength: { value: 3, message: "Min 3 characters" },
                      })}
                    />
                  </div>
                  {registerErrors.username && (
                    <p className="text-xs text-red-400 font-inter-beta">
                      {registerErrors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="reg-email"
                    className="text-white font-inter-bold"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler"
                      {...registerRegister("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </div>
                  {registerErrors.email && (
                    <p className="text-xs text-red-400 font-inter-beta">
                      {registerErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="reg-password"
                    className="text-white font-inter-bold"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler"
                      {...registerRegister("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 characters" },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-xs text-red-400 font-inter-beta">
                      {registerErrors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="reg-confirm"
                    className="text-white font-inter-bold"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="reg-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler"
                    {...registerRegister("confirmPassword", {
                      required: "Confirm your password",
                      validate: (val) =>
                        val === password || "Passwords don't match",
                    })}
                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-xs text-red-400 font-inter-beta">
                      {registerErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 font-inter-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
