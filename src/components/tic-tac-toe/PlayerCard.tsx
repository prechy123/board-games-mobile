import { useEffect, useState } from "react";
import * as api from "@/src/services/GameApi";
import * as toast from "@/src/utils/showToast"
import { Image, View } from "react-native";
import { Text } from "react-native-paper";

interface IPlayerCard {
  gameCode: string;
  winner: string;
}
const PlayersCard = ({ gameCode, winner }: IPlayerCard) => {
  const [player1, setPlayer1] = useState({
    _id: "1",
    userName: "-",
    profilePictureUrl:
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  });
  const [player2, setPlayer2] = useState({
    _id: "2",
    userName: "-",
    profilePictureUrl:
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  });

  useEffect(() => {
    if (winner) {
      let winnerUsername: string;
      if (player1._id === winner) {
        winnerUsername = player1.userName;
      } else {
        winnerUsername = player2.userName;
      }
      toast.showInfoToast("Winner", `The winner of the game is ${winnerUsername}`);
    }
  }, [winner, player1._id, player2.userName, player1.userName]);

  useEffect(() => {
    const handleFetchPlayers = async () => {
      const res = await api.getTicTacToeGamePlayers(gameCode);
      if (!res) return;
      setPlayer1(res.player1);
      setPlayer2(res.player2);
    };
    handleFetchPlayers();
  }, [gameCode]);

  return (
    <View style={{justifyContent: "space-around", alignItems: "center", marginTop: 20, flexDirection: 'row', gap: 12}}>
      <View>
        <Image
          source={{uri: player1.profilePictureUrl}}
          width={70}
          height={70}
          alt="Player 1"
          borderRadius={50}
          
        />
        <Text style={{textAlign: "center"}}>{player1.userName}</Text>
      </View>
      <Text style={{fontWeight: "bold"}}>VS</Text>
      <View>
        <Image
          source={{uri: player2.profilePictureUrl}}
          width={70}
          height={70}
          alt="Player 2"
          borderRadius={50}
        />
        <Text style={{textAlign: "center"}}>{player2.userName}</Text>
      </View>
    </View>
  );
};

export default PlayersCard;