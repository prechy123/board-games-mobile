import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Tile from "./Tile";

export default function MyTiles() {
  const [buttons, setButtons] = useState<string[][]>([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);
  return (
    // <View>
      <View style={styles.tilesWrapper}>
        <View style={{gap: 10}}>
          <Tile value={buttons[0][0]} />
          <Tile value={buttons[0][1]} />
          <Tile value={buttons[0][2]} />
        </View>
        <View style={{gap: 10}}>
          <Tile value={buttons[1][0]} />
          <Tile value={buttons[1][1]} />
          <Tile value={buttons[1][2]} />
        </View>
        <View style={{gap: 10}}>
          <Tile value={buttons[2][0]} />
          <Tile value={buttons[2][1]} />
          <Tile value={buttons[2][2]} />
        </View>
      </View>
    // </View>
  );
}

const styles = StyleSheet.create({
    tilesWrapper: {flexDirection: "row", gap: 20, borderRadius: 10,}
})