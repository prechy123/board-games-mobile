import * as toast from "../utils/showToast";
import * as storage from "../utils/asyncStorage";

const BASE = "user";

type InputType = {
  username: string;
  image: string;
  playerId: string
};
interface UserResponse {
  username: string;
  email: string;
  profilePictureUrl: string;
  playerId: string;
}

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

export const updateProfile = async (details: InputType) => {
  try {
    toast.showInfoToast("loading...", "Profile", );
    const response = await fetch(
      `${BACKEND_URL}/${BASE}/update-profile`,
      {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data: { message: string, user: UserResponse } = await response.json();
    toast.endToast();
    if (data.message === "User profile updated successfully") {
      toast.showSuccessToast(data.message, "Profile", );
      await storage.storeObject("user", data.user)
      // convert to jwt later
      await storage.storeString("id", data.user.playerId)
      return "success";
    }
    toast.showErrorToast(data.message, "Profile", );
  } catch (err) {
    console.log(err);
    toast.endToast();
    toast.showErrorToast("Internal server error, try again later", "Profile", );
  }
};