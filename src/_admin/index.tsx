import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfileEditForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    website: "",
    facebook: "",
    twitter: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      try {
        const response = await fetch("https://api.example.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          alert("Failed to load profile data.");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        alert("An error occurred while loading your profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return alert("User not authenticated.");

    try {
      const response = await fetch("https://api.example.com/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6 shadow-lg">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        {[
          { label: "Email address", name: "email", type: "email" },
          { label: "First name", name: "firstName", type: "text" },
          { label: "Last name", name: "lastName", type: "text" },
          { label: "Website", name: "website", type: "url" },
          { label: "Facebook", name: "facebook", type: "url" },
          { label: "Twitter", name: "twitter", type: "url" },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
        ))}
        <Button onClick={handleSave} className="w-full mt-4">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
