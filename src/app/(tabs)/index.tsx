import MyButton from "@/src/components/MyButton";
import {  StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const games = [
  { title: "Tic Tac Toe", link: "/tic-tac-toe" },
  { title: "Chess", link: "/" },
  { title: "Checkers", link: "/" },
  { title: "Scrabble", link: "/" },
  { title: "Ludo", link: "/" },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to <Text style={styles.headingSpan}>BOARD GAMES</Text></Text>

      {games.map((game) => (
        <View key={game.title} style={styles.gameBtn}>
          <MyButton title={game.title} link={game.link} />
        </View>
      ))}
      {/* <MyButton title="sign in" link="/sign-in" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  gameBtn: {
    marginVertical: 7,
    width: 250
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 15
  },
  headingSpan: {
    color: "#007bff",
    fontWeight: "bold"
  }
});
