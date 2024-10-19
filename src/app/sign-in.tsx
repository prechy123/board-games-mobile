import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function signInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
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
});
