import axiosInstance from "./axiosInstance";
import setProfile from "../utils/profile/setProfile";

// Get Thread Media (Public)
async function getThreadMedia(threadID) {
  const response = await axiosInstance.get(`/media/thread/${threadID}`);
  return {
    status: response.status,
    media: response.data.media,
  };
}

// Upload Profile Picture (Auth Required)
async function uploadProfilePicture(profilePictureFile) {
  const formData = new FormData();
  formData.append("profile_picture", profilePictureFile);

  const response = await axiosInstance.put("/media/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Update profile in Redux store if user data is returned
  if (response.data.user) {
    setProfile(response.data.user);
  }

  return {
    status: response.status,
    message: response.data.message,
    profilePictureUrl: response.data.profile_picture_url,
  };
}

// Upload Thread Media (Auth Required)
async function uploadThreadMedia(threadID, mediaFiles) {
  const formData = new FormData();
  mediaFiles.forEach(file => {
    formData.append("media", file);
  });

  const response = await axiosInstance.post(`/media/thread/${threadID}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return {
    status: response.status,
    message: response.data.message,
    uploadedMedia: response.data.uploadedMedia,
  };
}

// Delete Thread Media (Auth Required)
async function deleteThreadMedia(threadID) {
  const response = await axiosInstance.delete(`/media/thread/${threadID}`);
  return {
    status: response.status,
    message: response.data.message,
  };
}

// Delete Profile Picture (Auth Required)
async function deleteProfilePicture() {
  const response = await axiosInstance.delete("/media/profile");

  // Update profile in Redux store if user data is returned
  if (response.data.user) {
    setProfile(response.data.user);
  }

  return {
    status: response.status,
    message: response.data.message,
  };
}

export { getThreadMedia, uploadProfilePicture, uploadThreadMedia, deleteThreadMedia, deleteProfilePicture };
