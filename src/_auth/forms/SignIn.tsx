import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
    setLoading(true);
    try {
      const response = await fetch(
        `https://api/users?email=${formData.email}&password=${formData.password}`
      );
      const data = await response.json();

      if (response.ok && data.length > 0) {
        const user = data[0];
        localStorage.setItem("jwtToken", user.token);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
              <Lock className="w-5 h-5" /> Confirm a password
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

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                // id="rememberMe"
                // name="rememberMe"
                // checked={formData.rememberMe}
                onChange={handleChange}
              />
              <Label htmlFor="rememberMe" className="ml-2">
                Remember me
              </Label>
            </div>
            <a href="#" className="text-blue-600 text-sm">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login Now"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-600">
            Signup now
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
