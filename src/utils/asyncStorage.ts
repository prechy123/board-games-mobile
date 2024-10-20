import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/user";

export const storeObject = async (key: string, data: object)  => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (e) {
    // saving error
  }
};

export const storeString = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    // saving error
  }
};

export const getObject = async (key: string) : Promise<IUser | null> => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return jsonData != null ? JSON.parse(jsonData) : null;
  } catch (e) {
    // error reading value
    return null
  }
};

export const getString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
    return null
  } catch (e) {
    // error reading value
  }
};
