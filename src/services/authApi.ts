import * as toast from "../utils/showToast";
import * as storage from "../utils/asyncStorage";

const BASE = "auth";

type InputType = {
  email: string;
  password: string;
};

interface UserResponse {
  username: string;
  email: string;
  profilePictureUrl: string;
  playerId: string;
}

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const login = async (details: InputType) => {
  try {
    const toastId = toast.showToastLong("loading...");
    const response = await fetch(`${BACKEND_URL}/${BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data: { message: string; user: UserResponse } = await response.json();
    toast.endToast(toastId);
    if (data.message === "User login successfully") {
      await storage.storeObject("user", data.user);
      // convert to jwt later
      await storage.storeString("id", data.user.playerId);
      toast.showToastShort(data.message);
      return "success";
    }
    toast.showToastShort(data.message);
  } catch (err) {
    console.log(err);
    toast.showToastShort("Internal server error, try again later");
  }
};

export const register = async (details: InputType) => {
  try {
    const toastId = toast.showToastLong("loading...");
    const response = await fetch(
      `${BACKEND_URL}/${BASE}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data = await response.json();
    toast.endToast(toastId);
    if (data.message === "User registered successfully") {
      toast.showToastShort(data.message);
      const res = await login(details);
      return res;
    }
    toast.showToastShort(data.message);
  } catch (err) {
    console.log(err);
    toast.showToastShort("Internal server error, try again later");
  }
};

export const getProfile = async (id: string) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/${BASE}/profile/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res: {
      profile: { email: string; userName: string; profilePictureUrl: string };
    } = await response.json();
    if (res.profile.email) {
      return res.profile;
    }
  } catch (err) {
    console.log(err);
  }
};
