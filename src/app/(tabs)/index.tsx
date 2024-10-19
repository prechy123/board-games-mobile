import HomeButton from "@/src/components/HomeButton";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

interface IGames {
  title: string;
  link: "/" | "/tic-tac-toe";
}

const games: IGames[] = [
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
          <HomeButton title={game.title} link={game.link} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
  gameBtn: {
    marginVertical: 7,
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
