import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import MyTextInput from "../components/MyTextInput";
import { useState } from "react";
import MyButton from "../components/MyButton";
import { Link } from "expo-router";

export default function signInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login to your Board Games account</Text>
      <View>
        <View style={styles.inputContainer}>
          <MyTextInput label="Email Address" text={email} setText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <MyTextInput label="Password" text={password} setText={setPassword} />
        </View>
        <View style={{ alignSelf: "flex-start", marginVertical: 10 }}>
          <MyButton title="Log in" link="/" />
        </View>
      </View>
      <Link href="/sign-up">
        <Text style={{ textAlign: "left" }}>
          Already have an account? Sign Up
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    alignItems: "center",
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
