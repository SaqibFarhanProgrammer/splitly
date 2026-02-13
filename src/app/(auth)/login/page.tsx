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
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onLogin = async (data: LoginData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login:", data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-inter-reguler">
      <Card className="w-full max-w-md bg-zinc-950 border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-inter-bold text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-zinc-400 font-inter-light-betaa">
            Sign in to manage your expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
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
                  className="pl-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500"
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
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-white font-inter-bold"
                >
                  Password
                </Label>
                <Link
                  href="/forgot"
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500"
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

            <p className="text-center text-sm text-zinc-400 mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-white hover:underline">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
