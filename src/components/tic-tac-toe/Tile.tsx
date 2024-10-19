import { useTheme } from "@/src/providers/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Tile({
  value,
}: // handleClick,
{
  value: string;
  // handleClick: () => void;
}) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    tile: {
      padding: 30,
      backgroundColor: theme === "dark" ? "#fff" : "#000",
    },
  });
  return (
    <View style={styles.tile}>
      <Text>{value}</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//     tile: {
//         padding: 30,
//         backgroundColor: theme === "dark" ? "#fff" : "#000"
//     }
// })
