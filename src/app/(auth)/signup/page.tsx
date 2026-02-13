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
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();
  const password = watch("password");

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
            Create Account
          </CardTitle>
          <CardDescription className="text-zinc-400 font-inter-light-betaa">
            Join Splitwise to manage expenses with friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white font-inter-bold">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  className="pl-10 bg-zinc-900 border-white/10 text-white"
                  {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-inter-bold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-zinc-900 border-white/10 text-white"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-inter-bold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-zinc-900 border-white/10 text-white"
                  {...register("password", {
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
              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-white font-inter-bold">
                Confirm Password
              </Label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                className="bg-zinc-900 border-white/10 text-white"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (val) =>
                    val === password || "Passwords don't match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-400">
                  {errors.confirmPassword.message}
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

            <p className="text-center text-sm text-zinc-400 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
