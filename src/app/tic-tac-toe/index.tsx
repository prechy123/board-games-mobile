import { Link, useRouter } from "expo-router";
import { Button, Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TicTacToxIndex() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Tic Tac Toe</Text>

      {Platform.OS === "ios" && (
        <Button title="Back" onPress={() => router.back()} />
      )}
      {/* <Link href="game">
        <Text>To Game</Text>
      </Link> */}
      {/* <Link href="/(tabs)/tic-tac-toe/game">
        <Text>To Game</Text>
      </Link> */}
      <Button
        title="Start Game"
        onPress={() => router.push("/tic-tac-toe/game")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
});
