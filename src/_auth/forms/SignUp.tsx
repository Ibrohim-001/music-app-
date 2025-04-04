import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwtToken", data.token);
        alert("Registration successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg border border-gray-200">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-5 h-5" /> Enter your name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4 relative">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> Enter your email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4 relative">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-5 h-5" /> Create a password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-4 relative">
            <Label
              htmlFor="confirmPassword"
              className="flex items-center gap-2"
            >
              <Lock className="w-5 h-5" /> Confirm a password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4 flex items-center">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <Label htmlFor="acceptTerms" className="ml-2">
              I accept all terms & conditions
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600">
            Login now
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
