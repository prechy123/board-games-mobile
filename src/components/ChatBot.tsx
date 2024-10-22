import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useTheme } from "../providers/ThemeProvider";
import { Text } from "react-native-paper";
import { Pressable, ScrollView, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";

interface Chat {
  sender?: string;
  receiver?: string;
  message: string;
}

const socket = io(`${process.env.EXPO_PUBLIC_BACKEND_URL}/chat`);

export default function ChatBox({
  gameCode,
  currentPlayer,
}: {
  gameCode: string;
  currentPlayer: string;
}) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", gameCode);
  }, [gameCode]);

  const handleSendMessage = () => {
    if (!message) {
      inputRef.current?.focus();
      return;
    }

    setMessage("");
    setChat((prev) => [...prev, { sender: "Me", message }]);
    socket.emit("sendMessage", { message, sender: currentPlayer, gameCode });
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      if (data.sender !== currentPlayer) {
        setChat((prev) => [
          ...prev,
          { receiver: data.sender, message: data.message },
        ]);
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [currentPlayer]);
  return (
    <ScrollView
      style={{
        position: "absolute",
        bottom: open ? 0 : -55,
        left: 0,
        // width: "100%",
        backgroundColor: "black",
      }}
    >
      <Pressable onPress={() => setOpen(!open)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Chat Room</Text>
          <Svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <Path
              d="M17.5 3C18.0523 2.99999 18.5 3.4477 18.5 3.99999L18.5001 15H21C21.4045 15 21.7691 15.2437 21.9239 15.6173C22.0787 15.991 21.9931 16.4211 21.7071 16.7071L17.7071 20.7071C17.3166 21.0977 16.6834 21.0977 16.2929 20.7071L12.2929 16.7071C12.0069 16.4211 11.9214 15.991 12.0761 15.6173C12.2309 15.2437 12.5956 15 13 15H15.5001L15.5 4.00002C15.5 3.44774 15.9477 3.00002 16.5 3.00001L17.5 3Z"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
            <Path
              d="M3.00003 9C2.59557 9 2.23093 8.75636 2.07615 8.38268C1.92137 8.00901 2.00692 7.57889 2.29292 7.29289L5.5 4.08582V4H5.58582L6.29292 3.29289C6.68345 2.90237 7.31661 2.90237 7.70714 3.29289L8.41424 4H8.5V4.08576L11.7071 7.29289C11.9931 7.57889 12.0787 8.00901 11.9239 8.38268C11.7691 8.75636 11.4045 9 11 9H8.5L8.5 20C8.5 20.5523 8.05229 21 7.5 21H6.5C5.94772 21 5.5 20.5523 5.5 20L5.5 9H3.00003Z"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </Svg>
        </View>
      </Pressable>
      <View style={{height: "80%", width: "100%", padding: 20, backgroundColor: "blue"}}>
        <ScrollView style={{height: "80%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 8}}>
          {chat.map((eachChat, index) => (
            <View
              key={eachChat.message}
              ref={index === chat.length - 1 ? lastMessageRef : null}
            >
              <Text
              style={{
                textAlign: eachChat.sender === "Me" ? "right" : "left",
                marginTop: 4
              }}
              >
                <Text style={{
                    padding: 4,
                    borderRadius: 30,
                    maxWidth: "80%",
                }}>{eachChat.message}</Text>
              </Text>
            </View>
          ))}
        </ScrollView>
        <View>            
            <View style={{flexDirection: "row"}}>
                <MyTextInput label="Your message" text={message} setText={setMessage}  />
                <MyButton title="Send" onClick={handleSendMessage} />
            </View>
        </View>
      </View>
    </ScrollView>
  );
}
