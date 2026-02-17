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

    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setServerError("User Created Success Please Login")



    } catch (error: any) {
      setServerError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen mt-20  flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-950/80 backdrop-blur-sm border-zinc-800/60 shadow-2xl shadow-black/50">
        <CardHeader className="text-center space-y-3 pb-8 pt-6">
          <CardTitle className="text-4xl font-[inter-reguler] text-white tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Welcome to Splitly
          </CardTitle>
          <CardDescription className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
            Manage your expenses with friends
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900/30 p-1 rounded-xl mb-8 border border-zinc-800/50">
              <TabsTrigger
                value="login"
                className="rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {serverError && (
              <div className={`mb-6 p-4 rounded-xl ${serverError === "User Created Success Please Login" ?   "bg-green-500/10" : "bg-red-600" } border border-red-500/20 animate-in fade-in slide-in-from-top-2`}>
                <p className={` text-sm ${serverError === "User Created Success Please Login" ? "text-green-500" : "text-red-400" } text-center font-medium`}>
                  {serverError === "User Created Success Please Login" ? serverError : serverError}
                </p>
              </div>
            )}

            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
                <div className="space-y-2.5">
                  <Label className="text-sm font-medium text-zinc-300 ml-1">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/50 transition-all rounded-xl"
                    {...registerLogin("email", { required: "Email required" })}
                  />
                  {loginErrors.email && (
                    <p className="text-xs text-red-400 ml-1">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2.5 relative">
                  <Label className="text-sm font-medium text-zinc-300 ml-1">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/50 transition-all rounded-xl pr-12"
                      {...registerLogin("password", {
                        required: "Password required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showLoginPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-xs text-red-400 ml-1">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 mt-2 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <form
                onSubmit={handleRegisterSubmit(onRegister)}
                className="space-y-4"
              >
                <div className="space-y-2.5">
                  <Label className="text-sm font-medium text-zinc-300 ml-1">
                    Username
                  </Label>
                  <Input
                    placeholder="johndoe"
                    className="h-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/50 transition-all rounded-xl"
                    {...registerRegister("username", {
                      required: "Username required",
                    })}
                  />
                  {registerErrors.username && (
                    <p className="text-xs text-red-400 ml-1">
                      {registerErrors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <Label className="text-sm font-medium text-zinc-300 ml-1">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/50 transition-all rounded-xl"
                    {...registerRegister("email", {
                      required: "Email required",
                    })}
                  />
                  {registerErrors.email && (
                    <p className="text-xs text-red-400 ml-1">
                      {registerErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2.5 relative">
                  <Label className="text-sm font-medium text-zinc-300 ml-1">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/50 transition-all rounded-xl pr-12"
                      {...registerRegister("password", {
                        required: "Password required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showRegisterPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-xs text-red-400 ml-1">
                      {registerErrors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <Label className="text-sm font-medium text-zinc-300 ml-1">
                    Confirm Password
                  </Label>
                  <Input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/50 transition-all rounded-xl"
                    {...registerRegister("confirmPassword", {
                      required: "Confirm required",
                      validate: (val) =>
                        val === password || "Passwords do not match",
                    })}
                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-xs text-red-400 ml-1">
                      {registerErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 mt-2 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl transition-all "
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
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
