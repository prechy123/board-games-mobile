import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import MyTextInput from "../components/MyTextInput";
import { useState } from "react";
import MyButton from "../components/MyButton";
import { Link, Stack, useRouter } from "expo-router";
import { showErrorToast } from "../utils/showToast";
import * as api from "../services/authApi";
import * as storage from "../utils/asyncStorage";
import { useAuth } from "../providers/AuthProvider";

export default function signInScreen() {
  const {setAuth} = useAuth()
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    if (email === "" || password === "")
      return showErrorToast("Login", "Email or Password not filled");
    const status = await api.login({ email, password });
    if (status && status === "success") {
      const userData = await storage.getObject("user");
      if (userData) {
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          email: userData.email,
          profilePictureUrl: userData.profilePictureUrl,
          username: userData.username,
          playerId: userData.playerId,
        }));

        router.push("/");
        // router.back()
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{ headerBackTitle: "Back" }} />
      <Text style={styles.heading}>Login to your Board Games account</Text>
      <View>
        <View style={styles.inputContainer}>
          <MyTextInput label="Email Address" text={email} setText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <MyTextInput label="Password" text={password} setText={setPassword} />
        </View>
        <Pressable onPress={handleLogIn}>
          <View style={{ alignSelf: "flex-start", marginVertical: 10 }}>
            <MyButton title="Log in" />
          </View>
        </Pressable>
      </View>
      <Link href="/sign-up" style={{marginTop: 10}}>
        <Text style={{ textAlign: "left" }}>
          Already have an account? Sign Up
        </Text>
      </Link>
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
  heading: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 15,
  },
  inputContainer: {
    width: 250,
  },
});
