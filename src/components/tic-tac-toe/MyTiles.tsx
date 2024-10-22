import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Tile from "./Tile";
import { useAuth } from "@/src/providers/AuthProvider";
import { io } from "socket.io-client";
import * as toast from "@/src/utils/showToast";
import PlayersCard from "./PlayerCard";

const socket = io(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tic-tac-toe`);

interface Props {
  gameCode: string;
  currentPlayer: string;
}

export default function MyTiles({ gameCode, currentPlayer }: Props) {
  const { playerId } = useAuth();
  const [playerTurn, setPlayerTurn] = useState("defaultPlayerId");
  const [winner, setWinner] = useState("");
  const [buttons, setButtons] = useState<string[][]>([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);

  useEffect(() => {
    socket.emit("joinRoom", gameCode);
  }, [gameCode]);

  const handleClick = (x: number, y: number) => {
    if (winner) {
      toast.showInfoToast("Game Over", "Tic Tac Toe");
      return;
    }
    if (playerTurn !== "defaultPlayerId") {
      if (playerTurn !== playerId) {
        toast.showInfoToast("It is not your turn","Tic Tac Toe", );
        return;
      }
    }
    if (playerTurn === "defaultPlayerId") {
      if (currentPlayer === "O") {
        toast.showInfoToast("You are not the starting player","Tic Tac Toe", );
        return;
      }
    }

    setButtons((prev) => {
      if (prev[x][y] !== "-") {
        toast.showInfoToast("Tiles has content", "Tic Tac Toe", );
        return prev;
      }

      const newButtons = prev.map((row) => [...row]);
      newButtons[x][y] = currentPlayer;
      socket.emit("makeMove", {
        playerId,
        gameCode,
        newTiles: newButtons,
      });
      setPlayerTurn("otherPlayer");
      return newButtons;
    });
  };
  useEffect(() => {
    socket.on("updateGame", (data) => {
      setButtons(data.game);
      setPlayerTurn(data.playerTurn);
    });

    socket.on("game-over", (data) => {
      setWinner(data.winner);
    });
  }, []);
  return (
    <View>
      <View style={styles.tilesWrapper}>
        <View style={styles.tile}>
          <Tile value={buttons[0][0]} handleClick={() => handleClick(0, 0)} />
          <Tile value={buttons[0][1]} handleClick={() => handleClick(0, 1)} />
          <Tile value={buttons[0][2]} handleClick={() => handleClick(0, 2)} />
        </View>
        <View style={styles.tile}>
          <Tile value={buttons[1][0]} handleClick={() => handleClick(1, 0)} />
          <Tile value={buttons[1][1]} handleClick={() => handleClick(1, 1)} />
          <Tile value={buttons[1][2]} handleClick={() => handleClick(1, 2)} />
        </View>
        <View style={styles.tile}>
          <Tile value={buttons[2][0]} handleClick={() => handleClick(2, 0)} />
          <Tile value={buttons[2][1]} handleClick={() => handleClick(2, 1)} />
          <Tile value={buttons[2][2]} handleClick={() => handleClick(2, 2)} />
        </View>
      </View>
      <PlayersCard gameCode={gameCode} winner={winner} />
    </View>
  );
}

const styles = StyleSheet.create({
  tilesWrapper: { flexDirection: "column", gap: 20, borderRadius: 10 },
  tile: { gap: 10, flexDirection: "row"}
});
