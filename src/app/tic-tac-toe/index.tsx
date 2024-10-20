import MyButton from "@/src/components/MyButton";
import MyTextInput from "@/src/components/MyTextInput";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import * as toast from "@/src/utils/showToast"
import { io } from "socket.io-client";

const socket = io(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tic-tac-toe`);

export default function TicTacToxIndex() {
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const {playerId} = useAuth()
  const [joining, setJoining] = useState(false);

  const createGame = () => {
    toast.showInfoToast("Tic Tac Toe", "Creating Game...")
    socket.emit("createGame", {playerId})
  }
  const joinGame = () => {
    toast.showInfoToast("Tic Tac Toe", "Joining Game...")
    setJoining(true);
    socket.emit("joinGame", { playerId, gameCode: code });
  }

  // useEffect(() => {
  //   socket.on("joinedGame", (data) => {
  //     toast.endToast();
  //     // showToast("success", "Joined Game");
  //     if (joining) {
  //       router.push(`tic-tac-toe/${data.gameCode}?state=join`);
  //     } else {
  //       router.push(`tic-tac-toe/${data.gameCode}?state=create`);
  //     }
  //   });

  //   socket.on("error", (data) => {
  //     toast.dismiss();
  //     showToast("error", data);
  //   });

  //   return () => {
  //     socket.off("joinedGame");
  //   };
  // }, [route, joining]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.heading}>Tic Tac Toe</Text>

      <View>
        <MyButton link="/tic-tac-toe/game" title="Create Game" />
        <View style={styles.orWrapper}>
          <View
            style={{ width: "35%", height: 1, backgroundColor: "#fff" }}
          ></View>
          <Text style={{ fontSize: 20 }}>OR</Text>
          <View
            style={{ width: "35%", height: 1, backgroundColor: "#fff" }}
          ></View>
        </View>
      </View>

      <View style={styles.joinWrapper}>
        <View style={{ flex: 0.5 }}>
          <MyTextInput label="Enter Code" text={code} setText={setCode} />
        </View>
        <View style={{ flex: 0.3 }}>
          <MyButton link="/tic-tac-toe/game" title="Join" />
        </View>
      </View>

      {Platform.OS === "ios" && (
        <View style={{ marginTop: 30 }}>
          <Button title="Back" onPress={() => router.back()} />
        </View>
      )}
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
    fontSize: 30,
    textAlign: "center",
    marginBottom: 17,
    fontWeight: "bold",
  },
  orWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  joinWrapper: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
