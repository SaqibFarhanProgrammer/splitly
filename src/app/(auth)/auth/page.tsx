"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}
interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AuthPage() {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginData>();
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm<RegisterData>();
  const password = watch("password");

  const onLogin = async (data: LoginData) => {
    setServerError(null);
    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/login", data);
      if (res.status >= 400) throw new Error(res.data.error || "Login failed");
      router.push("/profile");
    } catch (error: any) {
      setServerError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterData) => {
    setServerError(null);
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    console.log("cahal");
    

    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (res.status >= 400)
        throw new Error(res.data.error || "Registration failed");
      router.push("/profile");
    } catch (error: any) {
      setServerError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800 shadow-2xl">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
            Welcome to Splitwise
          </CardTitle>
          <CardDescription className="text-zinc-500 text-sm">
            Manage your expenses with friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 p-1 rounded-lg mb-8 border border-zinc-800">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md text-zinc-400 hover:text-zinc-200 transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md text-zinc-400 hover:text-zinc-200 transition-all"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {serverError && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400 text-center font-medium">
                  {serverError}
                </p>
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...registerLogin("email", { required: "Email required" })}
                  />
                  {loginErrors.email && (
                    <p className="text-xs text-red-400">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label>Password</Label>
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...registerLogin("password", {
                      required: "Password required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showLoginPassword ? <EyeOff /> : <Eye />}
                  </button>
                  {loginErrors.password && (
                    <p className="text-xs text-red-400">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form
                onSubmit={handleRegisterSubmit(onRegister)}
                className="space-y-5"
              >
                <Input
                  placeholder="Username"
                  {...registerRegister("username", {
                    required: "Username required",
                  })}
                />
                <Input
                  placeholder="Email"
                  {...registerRegister("email", { required: "Email required" })}
                />
                <Input
                  type={showRegisterPassword ? "text" : "password"}
                  placeholder="Password"
                  {...registerRegister("password", {
                    required: "Password required",
                  })}
                />
                <Input
                  type={showRegisterPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...registerRegister("confirmPassword", {
                    required: "Confirm required",
                    validate: (val) =>
                      val === password || "Passwords do not match",
                  })}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
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
