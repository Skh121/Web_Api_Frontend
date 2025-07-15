import React, { useState, useEffect } from "react";
import { FiUpload, FiStar } from "react-icons/fi";
import { format } from "date-fns";
import {
  useGetMyProfile,
  useUpdateMyProfile,
} from "../../hooks/useProfileSettings";

// Reusable styled input components
const Input = (props) => (
  <input
    {...props}
    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
  />
);
const Textarea = (props) => (
  <textarea
    {...props}
    rows="4"
    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
  />
);

const ProfileSettings = () => {
  const { data: userProfile, isLoading: isLoadingProfile } = useGetMyProfile();
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useUpdateMyProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // --- THIS IS THE AUTOMATIC POPULATION LOGIC ---
  useEffect(() => {
    if (userProfile) {
      // Logic to get firstName and lastName from the populated user object
      const nameParts = userProfile.user?.fullName.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Set the state for the form fields
      setFormData({
        firstName: userProfile.firstName || firstName, // Prioritize existing profile firstName
        lastName: userProfile.lastName || lastName, // Prioritize existing profile lastName
        bio: userProfile.bio || "",
      });
      setAvatarPreview(userProfile.avatar || "");
    }
  }, [userProfile]); // This runs automatically when userProfile data arrives

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("firstName", formData.firstName);
    submissionData.append("lastName", formData.lastName);
    submissionData.append("bio", formData.bio);
    if (avatarFile) {
      submissionData.append("avatar", avatarFile);
    }
    updateProfile(submissionData);
  };

  if (isLoadingProfile) {
    return (
      <div className="text-center p-10 text-gray-400">Loading Profile...</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-700 rounded-xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">
          Profile Information
        </h3>
        <p className="text-sm text-gray-400">
          Update your personal information and profile settings.
        </p>

        {/* Avatar Section */}
        <div className="flex items-center space-x-4 mt-6">
          <img
            src={
              avatarPreview ||
              `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=2563eb&color=fff`
            }
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover bg-gray-700"
          />
          <div>
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center space-x-2"
            >
              <FiUpload />
              <span>Change Avatar</span>
            </label>
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
              accept="image/png, image/jpeg"
            />
            <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 2MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              First Name
            </label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Last Name
            </label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Email
          </label>
          <Input
            name="email"
            type="email"
            value={userProfile?.user?.email || ""}
            readOnly
            className="bg-gray-900 cursor-not-allowed"
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Bio
          </label>
          <Textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Subscription and Save Section */}
      <div className="bg-gray-800/50 p-6 border-t border-gray-700 rounded-b-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400">
              Subscription Status
            </h4>
            {userProfile?.subscription ? (
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                  <FiStar size={12} />
                  <span>{userProfile.subscription.plan} Plan</span>
                </span>
                {userProfile.subscription.expiresAt && (
                  <span className="text-sm text-gray-400">
                    Expires{" "}
                    {format(new Date(userProfile.subscription.expiresAt), "PP")}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                No active subscription.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isUpdatingProfile}
            className="bg-white hover:bg-gray-200 text-gray-900 font-bold py-2 px-6 rounded-lg disabled:opacity-50"
          >
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </form>
  );
};

export default ProfileSettings;
