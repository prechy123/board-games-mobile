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
import * as api from "../services/authApi";
import { useDispatch } from "react-redux";
import { isAuth } from "../redux/reducers/authSlice";
import * as storage from "../utils/asyncStorage";
import { emailSchema, passwordSchema } from "../types/schema";
import { showErrorToast } from "../utils/showToast";
// import Toast from "react-native-root-toast";

export default function signUpScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);
    if (!emailValidation.success) {
      showErrorToast("Register", emailValidation.error.errors[0].message)
      return;
    }

    if (!passwordValidation.success) {
      showErrorToast("Register", passwordValidation.error.errors[0].message)
      return;
    }
    const status = await api.register({ email, password });
    if (status && status === "success") {
      const userData = await storage.getObject("user");
      if (userData) {
        dispatch(
          isAuth({
            isAuthenticated: true,
            email: userData.email,
            profilePictureUrl: userData.profilePictureUrl,
            username: userData.username,
            playerId: userData.playerId,
          })
        );
        router.push("/");
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{ headerBackTitle: "Back" }} />
      <Text style={styles.heading}>Create an account with Board Games</Text>
      <View>
        <View style={styles.inputContainer}>
          <MyTextInput label="Email Address" text={email} setText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <MyTextInput label="Password" text={password} setText={setPassword} />
        </View>
        <Pressable onPress={handleRegistration}>
          <View style={{ alignSelf: "flex-start", marginVertical: 10 }}>
            <MyButton title="Register" />
          </View>
        </Pressable>
      </View>
      <Link href="/sign-in">
        <Text style={{ textAlign: "left" }}>
          Already have an account? Sign in
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
