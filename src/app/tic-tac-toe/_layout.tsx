import { Stack } from "expo-router";

export default function TicTacToeLayout() {
    return (
        <Stack> 
            <Stack.Screen name="index" options={{title: "Play Tic Tac Toe",}}/>
            <Stack.Screen name="game" options={{title: "Game"}}/>
        </Stack>
    )
}