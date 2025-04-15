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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";

const SignupForm = ({ onToggleForm }) => {
  const { signup, authState } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    specialization: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await signup(
      formData.username,
      formData.email,
      formData.password,
      formData.role,
      formData.name,
      formData.role === "doctor" ? formData.specialization : undefined
    );
  };

  return (
    <Card className="auth-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-teal-600">
          Create Your Account
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Join MindfulChat and start your mental health journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Jane Doe"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-focus-effect"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="janedoe"
              required
              value={formData.username}
              onChange={handleChange}
              className="input-focus-effect"
            />
          </div>

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
            <Label htmlFor="password">Password</Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-focus-effect"
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={handleRoleChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient" className="cursor-pointer">
                  Patient
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doctor" id="doctor" />
                <Label htmlFor="doctor" className="cursor-pointer">
                  Doctor
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.role === "doctor" && (
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                placeholder="e.g., Psychiatry, Psychology"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="input-focus-effect"
              />
            </div>
          )}

          {authState.error && (
            <div className="text-sm text-red-500 text-center">{authState.error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={authState.isLoading}
          >
            {authState.isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full">
          Already have an account?{" "}
          <button
            onClick={onToggleForm}
            className="text-teal-600 hover:underline font-medium"
            type="button"
          >
            Log in
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
