import MyButton from "@/src/components/MyButton";
import MyTextInput from "@/src/components/MyTextInput";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/src/providers/ThemeProvider";
import { showErrorToast } from "@/src/utils/showToast";
import { useAuth } from "@/src/providers/AuthProvider";
import * as api from "@/src/services/userApi";
import convertToBase64 from "@/src/utils/convertToBase64";

export default function Settings() {
  const { isAuthenticated, email, profilePictureUrl, username, playerId } =
    useAuth();
  const [user, setUser] = useState(username);
  const { theme } = useTheme();
  const [profilePicture, setProfilePicture] = useState(profilePictureUrl);
  const [profilePictureChange, setProfilePictureChange] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Not allowed to access gallery");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
      setProfilePictureChange(true);
    } else {
      showErrorToast("Profile", "You did not select any image.");
    }
  };

  const handleUpdateProfile = async () => {
    let newProfilePicture = "";
    if (profilePictureChange) {
      newProfilePicture = await convertToBase64(profilePicture);
      setProfilePictureChange(false);
    }
    await api.updateProfile({
      username: user,
      image: newProfilePicture,
      playerId,
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isAuthenticated ? (
        <View style={{ width: 250, alignItems: "center" }}>
          <View style={{ width: 250 }}>
            <MyTextInput label="User Name" text={user} setText={setUser} />
          </View>
          <Text style={{ alignSelf: "flex-start", ...styles.subHeading }}>
            Email Address:
          </Text>
          <Text>{email}</Text>
          <Text style={{ alignSelf: "flex-start", ...styles.subHeading }}>
            Profile Picture:
          </Text>
          <Pressable onPress={pickImage}>
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: profilePicture }}
                width={100}
                height={100}
                borderRadius={50}
                resizeMode="cover"
              />
              <View style={{ position: "absolute", right: -5, top: -5 }}>
                <SimpleLineIcons
                  name="plus"
                  size={24}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </View>
            </View>
          </Pressable>
          <View style={{ alignSelf: "flex-end", marginTop: 10 }}>
            <MyButton title="Update" onClick={handleUpdateProfile} />
          </View>
        </View>
      ) : (
        <View style={{ width: 250, alignItems: "center" }}>
          <Text>You are not logged in</Text>
          <MyButton title="Log in" link="/sign-in" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 23,
    marginTop: 12,
    marginBottom: 4,
  },
});
