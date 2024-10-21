import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/providers/ThemeProvider";
import copyToClipboard from "@/src/utils/copyToClipboard";
import MyTiles from "@/src/components/tic-tac-toe/MyTiles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { io } from "socket.io-client";

type Route = RouteProp<RootStackParamList, "ticTacToeBoard">
const socket = io(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tic-tac-toe`);

export default function TicTacToeBoard() {
  const route: Route = useRoute()
  const {id, state} = route.params
  const [roomFull, setRoomFull] = useState(false);
  const { theme } = useTheme();
  const [currentPlayer, setCurrentPlayer] = useState("X");

  useEffect(() => {
    socket.emit("joinRoom", id);
  }, [id]);

  useEffect(() => {
    socket.emit("joinRoom", id);
    socket.on("playerJoined", (data) => {
      console.log("New player joined:", data);
      setRoomFull(true);
    });
    if (state === "join") {
      setCurrentPlayer("O");
      setRoomFull(true);
    }

    return () => {
      socket.off("playerJoined");
    };
  }, [id, state]);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: "Back" }} />
      {roomFull ? (
        <MyTiles gameCode={id} currentPlayer={currentPlayer} />
      ) : (
        <View>
          <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 15 }}>
            Waiting for other player
          </Text>
          <Pressable onPress={() => copyToClipboard("test random")}>
            <View>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Room Code: {id}{" "}
                <MaterialIcons
                  name="content-paste"
                  size={18}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </Text>
            </View>
          </Pressable>
        </View>
      )}
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
});
