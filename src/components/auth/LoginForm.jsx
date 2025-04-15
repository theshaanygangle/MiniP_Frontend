import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const LoginForm = ({ onToggleForm }) => {
  const { login, authState } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <Card className="auth-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-teal-600">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Log in to your MindfulChat account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-focus-effect"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-teal-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="input-focus-effect"
            />
          </div>

          {authState.error && (
            <div className="text-sm text-red-500 text-center">
              {authState.error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={authState.isLoading}
          >
            {authState.isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full">
          Don't have an account?{" "}
          <button
            onClick={onToggleForm}
            className="text-teal-600 hover:underline font-medium"
            type="button"
          >
            Sign up
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
